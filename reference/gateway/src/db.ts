/*
 * Copyright 2025 Jtjr86
 * SSI Cloud Track A: Database client for PostgreSQL
 */
import { Pool, PoolClient } from 'pg';

// Singleton pool instance
let pool: Pool | null = null;

/**
 * Get or create PostgreSQL connection pool
 * Uses DATABASE_URL from environment
 */
export function getPool(): Pool {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;
    
    if (!connectionString) {
      throw new Error(
        'DATABASE_URL environment variable is required for SSI Cloud Track A. ' +
        'Example: postgres://user:pass@localhost:5432/ssi_cloud'
      );
    }

    pool = new Pool({
      connectionString,
      max: 20, // Maximum pool size
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    pool.on('error', (err) => {
      console.error('[db] Unexpected PostgreSQL error:', err);
    });

    console.log('[db] PostgreSQL connection pool initialized');
  }

  return pool;
}

/**
 * Execute a query with automatic connection management
 */
export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<{ rows: T[]; rowCount: number }> {
  const pool = getPool();
  const start = Date.now();
  
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    
    console.log('[db] Query executed', {
      duration: `${duration}ms`,
      rows: result.rowCount,
      text: text.substring(0, 80) + (text.length > 80 ? '...' : '')
    });
    
    return { rows: result.rows, rowCount: result.rowCount ?? 0 };
  } catch (error) {
    console.error('[db] Query error:', {
      text: text.substring(0, 100),
      params,
      error: error instanceof Error ? error.message : String(error)
    });
    throw error;
  }
}

/**
 * Get a client from the pool for transactions
 */
export async function getClient(): Promise<PoolClient> {
  const pool = getPool();
  return pool.connect();
}

/**
 * Close the connection pool (for graceful shutdown)
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
    console.log('[db] PostgreSQL connection pool closed');
  }
}

// Graceful shutdown on process termination
process.on('SIGTERM', async () => {
  console.log('[db] SIGTERM received, closing pool...');
  await closePool();
});

process.on('SIGINT', async () => {
  console.log('[db] SIGINT received, closing pool...');
  await closePool();
});
