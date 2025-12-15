/**
 * Track B2.3: Role-Based Access Control (RBAC) Middleware
 * 
 * Enforces role-based permissions on protected endpoints using the role field
 * already attached by JWT/API key authentication middleware.
 * 
 * Roles (from B2.1/B2.2):
 * - viewer: Read-only audit access (lowest privilege)
 * - auditor: Read-only + chain verification (medium privilege)
 * - admin: Write decisions + full audit access (highest privilege)
 * 
 * Guardrails:
 * 1. Dev mode bypass ONLY for ENABLE_INSECURE_DEV === 'true'
 * 2. Role check AFTER auth check (requireAuth before requireRole)
 * 3. Explicit role lists (no wildcards)
 * 4. 403 for insufficient permissions (401 for missing auth)
 * 5. No mocking in tests (real JWT/API keys only)
 */

import { Request, Response, NextFunction } from 'express';
import { AuthContext } from './apiKeyAuth';

/**
 * Middleware: Require authentication (JWT or API key)
 * 
 * Checks if req.auth exists (set by jwtAuthMiddleware or apiKeyAuthMiddleware).
 * If missing and ENABLE_INSECURE_DEV !== 'true': return 403 FORBIDDEN.
 * If missing and ENABLE_INSECURE_DEV === 'true': allow through (dev bypass).
 * 
 * Guardrail 1: Dev mode bypass only for exact match 'true'
 * Guardrail 4: Returns 401 for missing auth (authentication failure)
 */
export function requireAuth(req: Request, res: Response, next: NextFunction): any {
  const auth = (req as any).auth as AuthContext | undefined;

  // Check if authenticated (JWT or API key set req.auth)
  if (!auth) {
    // Guardrail 1: Dev mode bypass ONLY if env var is exactly 'true'
    if (process.env.ENABLE_INSECURE_DEV === 'true') {
      console.log('[RBAC] Dev mode: allowing unauthenticated request');
      return next();
    }

    // Production: require authentication
    console.log('[RBAC] Authentication required, no credentials provided');
    return res.status(401).json({ 
      error: 'AUTHENTICATION_REQUIRED',
      message: 'This endpoint requires authentication via JWT or API key'
    });
  }

  // Authenticated: proceed to next middleware
  next();
}

/**
 * Middleware Factory: Require specific role(s)
 * 
 * Returns middleware that checks if req.auth.role is in the allowed roles list.
 * Assumes requireAuth has already been called (req.auth exists).
 * 
 * @param allowedRoles - Array of allowed role strings (e.g., ['admin'], ['viewer', 'auditor'])
 * @returns Express middleware function
 * 
 * Guardrail 2: Assumes auth check already passed (call requireAuth first)
 * Guardrail 3: Explicit role lists (no wildcards or empty arrays)
 * Guardrail 4: Returns 403 for wrong role (authorization failure, not authentication)
 */
export function requireRole(allowedRoles: string[]): (req: Request, res: Response, next: NextFunction) => any {
  // Guardrail 3: Validate explicit role list at middleware creation time
  if (!Array.isArray(allowedRoles) || allowedRoles.length === 0) {
    throw new Error('[RBAC] requireRole called with invalid role list (must be non-empty array)');
  }

  // Guardrail 3: Reject wildcard roles
  if (allowedRoles.includes('*')) {
    throw new Error('[RBAC] requireRole does not support wildcard roles (use explicit role names)');
  }

  return (req: Request, res: Response, next: NextFunction): any => {
    const auth = (req as any).auth as AuthContext | undefined;

    // Guardrail 2: Safe-fail if auth is missing (should never happen if requireAuth was called first)
    if (!auth) {
      // Check for dev mode bypass (same logic as requireAuth)
      if (process.env.ENABLE_INSECURE_DEV === 'true') {
        console.log('[RBAC] Dev mode: skipping role check (no auth context)');
        return next();
      }
      
      console.error('[RBAC] CRITICAL: requireRole called without auth context (did you forget requireAuth?)');
      return res.status(500).json({ 
        error: 'INTERNAL_ERROR',
        message: 'RBAC middleware misconfigured (auth context missing)'
      });
    }

    // Check if user's role is in the allowed list
    if (!allowedRoles.includes(auth.role)) {
      // Guardrail 4: Return 403 for insufficient permissions (not 401)
      console.log(`[RBAC] Role check failed: user has '${auth.role}', required one of: ${allowedRoles.join(', ')}`);
      return res.status(403).json({
        error: 'INSUFFICIENT_PERMISSIONS',
        message: `This endpoint requires one of the following roles: ${allowedRoles.join(', ')}`,
        required_roles: allowedRoles,
        user_role: auth.role
      });
    }

    // Role check passed: proceed
    console.log(`[RBAC] Role check passed: user has '${auth.role}' (allowed: ${allowedRoles.join(', ')})`);
    next();
  };
}
