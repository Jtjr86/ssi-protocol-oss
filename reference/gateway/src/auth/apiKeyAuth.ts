// Track B2.1: API Key Authentication Middleware
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { query } from "../db";

export interface AuthContext {
  tenant_id: string;
  role: string;
  auth_method: string;
}

export async function apiKeyAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const apiKey = req.headers["x-api-key"] as string | undefined;

  // If no API key provided, fall through to x-tenant-id header auth (B1 backwards compat)
  if (!apiKey) {
    return next();
  }

  try {
    // Guardrail 2: Fast lookup using key_prefix (indexed query, avoid full-table bcrypt scan)
    const keyPrefix = apiKey.substring(0, 12);
    
    const candidatesResult = await query<{
      key_hash: string;
      tenant_id: string;
      role: string;
      expires_at: string | null;
    }>(
      `SELECT key_hash, tenant_id, role, expires_at 
       FROM api_keys 
       WHERE key_prefix = $1 
         AND is_active = true 
         AND (expires_at IS NULL OR expires_at > NOW())`,
      [keyPrefix]
    );

    // Verify API key against candidates (typically 1-2 rows)
    for (const candidate of candidatesResult.rows) {
      const isValid = await bcrypt.compare(apiKey, candidate.key_hash);
      
      if (isValid) {
        // Attach auth context to request (Guardrail 3: API key tenant wins over header)
        (req as any).auth = {
          tenant_id: candidate.tenant_id,
          role: candidate.role,
          auth_method: "api_key",
        } as AuthContext;
        
        return next();
      }
    }

    // No matching key found
    res.status(401).json({ error: "INVALID_API_KEY" });
    return;
  } catch (error) {
    console.error("API key auth error:", error);
    res.status(500).json({ error: "AUTHENTICATION_ERROR" });
    return;
  }
}
