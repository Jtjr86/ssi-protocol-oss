// Track B2.2: JWT Authentication Middleware
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthContext } from "./apiKeyAuth";

export interface JwtPayload {
  sub: string;          // User ID
  tenant_id: string;    // Tenant ID
  role: string;         // Role (viewer, auditor, admin)
  exp: number;          // Expiry timestamp
  iat?: number;         // Issued at timestamp
}

// Guardrail 1: JWT_SECRET from environment variable
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.warn('[JWT Auth] WARNING: JWT_SECRET not set - JWT authentication will fail');
}

export async function jwtAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;

  // If no Authorization header, fall through to API key auth (Guardrail 3)
  if (!authHeader) {
    return next();
  }

  // Extract Bearer token
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    res.status(401).json({ error: 'MALFORMED_AUTH_HEADER' });
    return;
  }

  const token = parts[1];

  if (!JWT_SECRET) {
    res.status(500).json({ error: 'JWT_SECRET_NOT_CONFIGURED' });
    return;
  }

  try {
    // Guardrail 2: Use jwt.verify() (not decode()) with proper error handling
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Guardrail 4: Validate required JWT claims
    if (!payload.tenant_id || !payload.role || !payload.sub) {
      res.status(401).json({ error: 'INVALID_TOKEN_CLAIMS' });
      return;
    }

    // Validate role value
    const allowedRoles = ['viewer', 'auditor', 'admin'];
    if (!allowedRoles.includes(payload.role)) {
      res.status(401).json({ error: 'INVALID_ROLE' });
      return;
    }

    // Attach auth context to request (JWT wins over API key in precedence)
    (req as any).auth = {
      tenant_id: payload.tenant_id,
      role: payload.role,
      auth_method: 'jwt',
      sub: payload.sub,
    } as AuthContext & { sub: string };

    return next();
  } catch (error) {
    // Guardrail 2: Proper error handling for different JWT errors
    if (error instanceof jwt.TokenExpiredError) {
      res.status(401).json({ error: 'TOKEN_EXPIRED' });
      return;
    }
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'INVALID_TOKEN' });
      return;
    }
    console.error('[JWT Auth] Unexpected error:', error);
    res.status(401).json({ error: 'MALFORMED_TOKEN' });
    return;
  }
}
