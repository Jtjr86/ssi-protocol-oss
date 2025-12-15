/**
 * Track B2.3: RBAC (Role-Based Access Control) Test Suite
 * 
 * Validates role-based permissions on protected endpoints:
 * - POST /v1/decisions requires admin role
 * - GET /v1/audit/verify-chain requires auditor or admin
 * - GET /v1/audit/verify requires viewer, auditor, or admin
 * - Dev mode bypass allows unauthenticated writes
 * 
 * Guardrail 5: Uses real jwt.sign() and seeded API keys (no mocks)
 */

import jwt from 'jsonwebtoken';

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://localhost:4040';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key_256_bit_minimum_length_required_here_1234567890';

interface TestResult {
  name: string;
  passed: boolean;
  error?: string;
}

const results: TestResult[] = [];

function logTest(name: string, passed: boolean, error?: string) {
  results.push({ name, passed, error });
  const status = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${status}: ${name}`);
  if (error) {
    console.error(`  Error: ${error}`);
  }
}

// Shared RPX ID for verification tests (will be set by Test 2)
let testRpxId: string | null = null;

async function runTests() {
  console.log('========================================');
  console.log('Track B2.3: RBAC Test Suite');
  console.log('========================================\n');

  // =====================================
  // Test 1: Viewer cannot POST /v1/decisions (403)
  // =====================================
  try {
    const viewerToken = jwt.sign(
      {
        sub: 'user-viewer',
        tenant_id: 'tenant-alpha',
        role: 'viewer', // Viewer role (lowest privilege)
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const res = await fetch(`${GATEWAY_URL}/v1/decisions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${viewerToken}`,
      },
      body: JSON.stringify({
        system_id: 'trading-prod',
        action: {
          type: 'trade.order.place',
          payload: { notional: 1000 }
        }
      }),
    });

    if (res.status === 403) {
      const errorData = await res.json();
      if (errorData.error === 'INSUFFICIENT_PERMISSIONS') {
        logTest('Test 1: Viewer cannot POST /v1/decisions (403)', true);
      } else {
        logTest('Test 1: Viewer cannot POST /v1/decisions (403)', false, `Expected INSUFFICIENT_PERMISSIONS, got ${errorData.error}`);
      }
    } else {
      const data = await res.json().catch(() => ({}));
      logTest('Test 1: Viewer cannot POST /v1/decisions (403)', false, `Expected 403, got ${res.status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logTest('Test 1: Viewer cannot POST /v1/decisions (403)', false, String(err));
  }

  // =====================================
  // Test 2: Admin can POST /v1/decisions (200)
  // =====================================
  try {
    const adminToken = jwt.sign(
      {
        sub: 'user-admin',
        tenant_id: 'tenant-alpha',
        role: 'admin', // Admin role (highest privilege)
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const res = await fetch(`${GATEWAY_URL}/v1/decisions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`,
      },
      body: JSON.stringify({
        system_id: 'trading-prod',
        action: {
          type: 'trade.order.place',
          payload: { notional: 2000 }
        }
      }),
    });

    if (res.status === 200) {
      const data = await res.json();
      if (data.success && data.rpx_id) {
        // Save RPX ID for later verification tests
        testRpxId = data.rpx_id;
        logTest('Test 2: Admin can POST /v1/decisions (200)', true);
      } else {
        logTest('Test 2: Admin can POST /v1/decisions (200)', false, 'Response missing success or rpx_id');
      }
    } else {
      const errorData = await res.json().catch(() => ({}));
      logTest('Test 2: Admin can POST /v1/decisions (200)', false, `Expected 200, got ${res.status}: ${JSON.stringify(errorData)}`);
    }
  } catch (err) {
    logTest('Test 2: Admin can POST /v1/decisions (200)', false, String(err));
  }

  // =====================================
  // Test 3: Viewer can GET /v1/audit/verify (200)
  // =====================================
  try {
    if (!testRpxId) {
      throw new Error('Test 2 failed to create RPX entry, skipping Test 3');
    }

    const viewerToken = jwt.sign(
      {
        sub: 'user-viewer',
        tenant_id: 'tenant-alpha',
        role: 'viewer',
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const res = await fetch(`${GATEWAY_URL}/v1/audit/verify/${testRpxId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${viewerToken}`,
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      if (data.rpx_id === testRpxId) {
        logTest('Test 3: Viewer can GET /v1/audit/verify (200)', true);
      } else {
        logTest('Test 3: Viewer can GET /v1/audit/verify (200)', false, `Response rpx_id mismatch: ${data.rpx_id} !== ${testRpxId}`);
      }
    } else {
      const errorData = await res.json().catch(() => ({}));
      logTest('Test 3: Viewer can GET /v1/audit/verify (200)', false, `Expected 200, got ${res.status}: ${JSON.stringify(errorData)}`);
    }
  } catch (err) {
    logTest('Test 3: Viewer can GET /v1/audit/verify (200)', false, String(err));
  }

  // =====================================
  // Test 4: Viewer cannot GET /v1/audit/verify-chain (403)
  // =====================================
  try {
    if (!testRpxId) {
      throw new Error('Test 2 failed to create RPX entry, skipping Test 4');
    }

    const viewerToken = jwt.sign(
      {
        sub: 'user-viewer',
        tenant_id: 'tenant-alpha',
        role: 'viewer', // Viewer lacks permission for verify-chain
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const res = await fetch(`${GATEWAY_URL}/v1/audit/verify-chain/${testRpxId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${viewerToken}`,
      },
    });

    if (res.status === 403) {
      const errorData = await res.json();
      if (errorData.error === 'INSUFFICIENT_PERMISSIONS') {
        logTest('Test 4: Viewer cannot GET /v1/audit/verify-chain (403)', true);
      } else {
        logTest('Test 4: Viewer cannot GET /v1/audit/verify-chain (403)', false, `Expected INSUFFICIENT_PERMISSIONS, got ${errorData.error}`);
      }
    } else {
      const data = await res.json().catch(() => ({}));
      logTest('Test 4: Viewer cannot GET /v1/audit/verify-chain (403)', false, `Expected 403, got ${res.status}: ${JSON.stringify(data)}`);
    }
  } catch (err) {
    logTest('Test 4: Viewer cannot GET /v1/audit/verify-chain (403)', false, String(err));
  }

  // =====================================
  // Test 5: Auditor can GET /v1/audit/verify-chain (200)
  // =====================================
  try {
    if (!testRpxId) {
      throw new Error('Test 2 failed to create RPX entry, skipping Test 5');
    }

    const auditorToken = jwt.sign(
      {
        sub: 'user-auditor',
        tenant_id: 'tenant-alpha',
        role: 'auditor', // Auditor has permission for verify-chain
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const res = await fetch(`${GATEWAY_URL}/v1/audit/verify-chain/${testRpxId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${auditorToken}`,
      },
    });

    if (res.status === 200) {
      const data = await res.json();
      if (data.rpx_id === testRpxId && typeof data.anchored === 'boolean') {
        logTest('Test 5: Auditor can GET /v1/audit/verify-chain (200)', true);
      } else {
        logTest('Test 5: Auditor can GET /v1/audit/verify-chain (200)', false, 'Response missing rpx_id or anchored field');
      }
    } else {
      const errorData = await res.json().catch(() => ({}));
      logTest('Test 5: Auditor can GET /v1/audit/verify-chain (200)', false, `Expected 200, got ${res.status}: ${JSON.stringify(errorData)}`);
    }
  } catch (err) {
    logTest('Test 5: Auditor can GET /v1/audit/verify-chain (200)', false, String(err));
  }

  // =====================================
  // Test 6: Dev mode bypass (unauthenticated write allowed)
  // =====================================
  try {
    // No Authorization header, no x-api-key (completely unauthenticated)
    // Should work ONLY if ENABLE_INSECURE_DEV=true
    const res = await fetch(`${GATEWAY_URL}/v1/decisions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // No auth headers
      },
      body: JSON.stringify({
        system_id: 'trading-prod',
        action: {
          type: 'trade.order.place',
          payload: { notional: 3000 }
        }
      }),
    });

    // Dev mode enabled: should allow unauthenticated write (200)
    if (process.env.ENABLE_INSECURE_DEV === 'true') {
      if (res.status === 200) {
        const data = await res.json();
        if (data.success) {
          logTest('Test 6: Dev mode bypass (unauthenticated write allowed)', true);
        } else {
          logTest('Test 6: Dev mode bypass (unauthenticated write allowed)', false, 'Expected success=true in response');
        }
      } else {
        const errorData = await res.json().catch(() => ({}));
        logTest('Test 6: Dev mode bypass (unauthenticated write allowed)', false, `Expected 200 in dev mode, got ${res.status}: ${JSON.stringify(errorData)}`);
      }
    } else {
      // Dev mode disabled: should reject unauthenticated write (401)
      if (res.status === 401) {
        const errorData = await res.json();
        if (errorData.error === 'AUTHENTICATION_REQUIRED') {
          logTest('Test 6: Dev mode bypass (unauthenticated write allowed)', true);
        } else {
          logTest('Test 6: Dev mode bypass (unauthenticated write allowed)', false, `Expected AUTHENTICATION_REQUIRED, got ${errorData.error}`);
        }
      } else {
        const data = await res.json().catch(() => ({}));
        logTest('Test 6: Dev mode bypass (unauthenticated write allowed)', false, `Expected 401 without dev mode, got ${res.status}: ${JSON.stringify(data)}`);
      }
    }
  } catch (err) {
    logTest('Test 6: Dev mode bypass (unauthenticated write allowed)', false, String(err));
  }

  // =====================================
  // Summary
  // =====================================
  console.log('\n========================================');
  console.log('Test Summary');
  console.log('========================================');

  const passed = results.filter(r => r.passed).length;
  const total = results.length;

  console.log(`Passed: ${passed}/${total}`);

  if (passed === total) {
    console.log('\n✅ All RBAC tests passed!');
    console.log('B2.3 is ready for commit.');
    process.exit(0);
  } else {
    console.log('\n❌ Some tests failed. Review errors above.');
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('[FATAL] Test runner crashed:', err);
  process.exit(1);
});
