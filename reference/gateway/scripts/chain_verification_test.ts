/**
 * SSI Cloud Track A+: Chain Continuity Verification Test
 * 
 * Validates that /v1/audit/verify-chain correctly detects:
 * 1. Anchored entries (chain reaches genesis)
 * 2. Orphaned entries (broken chain due to missing previous)
 */
import 'dotenv/config';
import axios from 'axios';
import { query } from '../src/db';

const GATEWAY_URL = process.env.GATEWAY_URL || 'http://localhost:4040';

async function runChainVerificationTests() {
  console.log('====================================================');
  console.log('SSI Cloud Track A+: Chain Continuity Verification');
  console.log('====================================================\n');

  try {
    // Step 0: Clean up old test data to start fresh
    console.log('0. Cleaning up old trading-prod entries...');
    await query('DELETE FROM rpx_entries WHERE system_id = $1', ['trading-prod']);
    console.log('   ✓ Database cleaned\n');

    // Step 1: Create 3 chained entries
    console.log('1. Creating chain of 3 decisions...');
    const rpxIds: string[] = [];
    
    for (let i = 0; i < 3; i++) {
      try {
        const response = await axios.post(`${GATEWAY_URL}/v1/decisions`, {
          client_id: 'chain-test-client',
          system_id: 'trading-prod',
          action: {
            type: 'trade.order.place',
            payload: { symbol: 'BTCUSD', side: 'BUY', notional: 1000 + i * 100 }
          }
        });
        
        if (!response.data.rpx_id) {
          console.error(`   ✗ FAIL: Entry ${i + 1} returned no rpx_id`);
          console.error(`   Response:`, JSON.stringify(response.data, null, 2));
          process.exit(1);
        }
        
        rpxIds.push(response.data.rpx_id);
      } catch (err: any) {
        console.error(`   ✗ FAIL: Failed to create entry ${i + 1}`);
        console.error(`   Error:`, err.message);
        if (err.response) {
          console.error(`   Status:`, err.response.status);
          console.error(`   Response:`, JSON.stringify(err.response.data, null, 2));
        }
        process.exit(1);
      }
    }
    
    console.log(`   ✓ Created chain: ${rpxIds.length} entries\n`);

    // Step 2: Verify all entries are anchored (should all reach genesis)
    console.log('2. Verifying all entries are anchored to genesis...');
    for (const rpxId of rpxIds) {
      const chainVerify = await axios.get(`${GATEWAY_URL}/v1/audit/verify-chain/${rpxId}`);
      
      if (!chainVerify.data.anchored) {
        console.error(`   ✗ FAIL: Entry ${rpxId} is not anchored!`);
        console.error(`   Break reason: ${chainVerify.data.break_reason}`);
        process.exit(1);
      }
      
      console.log(`   ✓ ${rpxId}: anchored (depth: ${chainVerify.data.checked_count})`);
    }
    console.log();

    // Step 3: Delete middle entry to break chain
    const middleRpxId = rpxIds[1];
    console.log(`3. Breaking chain by deleting middle entry: ${middleRpxId}...`);
    await query('DELETE FROM rpx_entries WHERE rpx_id = $1', [middleRpxId]);
    console.log('   ✓ Middle entry deleted\n');

    // Step 4: Verify first entry still anchored (before the break)
    console.log('4. Verifying entry BEFORE break is still anchored...');
    const beforeBreak = await axios.get(`${GATEWAY_URL}/v1/audit/verify-chain/${rpxIds[0]}`);
    
    if (!beforeBreak.data.anchored) {
      console.error('   ✗ FAIL: Entry before break should still be anchored!');
      process.exit(1);
    }
    
    console.log(`   ✓ Entry ${rpxIds[0]}: still anchored\n`);

    // Step 5: Verify last entry is orphaned (after the break)
    console.log('5. Verifying entry AFTER break is orphaned...');
    const afterBreak = await axios.get(`${GATEWAY_URL}/v1/audit/verify-chain/${rpxIds[2]}`);
    
    if (afterBreak.data.anchored) {
      console.error('   ✗ FAIL: Entry after break should be orphaned!');
      console.error('   Response:', JSON.stringify(afterBreak.data, null, 2));
      process.exit(1);
    }
    
    if (afterBreak.data.break_reason !== 'MISSING_PREVIOUS') {
      console.error(`   ✗ FAIL: Expected break_reason=MISSING_PREVIOUS, got: ${afterBreak.data.break_reason}`);
      process.exit(1);
    }
    
    console.log(`   ✓ Entry ${rpxIds[2]}: orphaned (break_reason: ${afterBreak.data.break_reason})\n`);

    // Step 6: Verify orphaned entry is still cryptographically valid
    console.log('6. Verifying orphaned entry is still cryptographically valid...');
    if (!afterBreak.data.valid_entry) {
      console.error('   ✗ FAIL: Orphaned entry should still be cryptographically valid!');
      process.exit(1);
    }
    
    console.log('   ✓ Orphaned entry: valid_entry=true (crypto intact, chain broken)\n');

    // Cleanup
    console.log('7. Cleaning up test entries...');
    for (const rpxId of rpxIds) {
      await query('DELETE FROM rpx_entries WHERE rpx_id = $1', [rpxId]);
    }
    console.log('   ✓ Test entries cleaned up\n');

    console.log('====================================================');
    console.log('✓ ALL CHAIN CONTINUITY TESTS PASSED');
    console.log('====================================================\n');
    console.log('CLAIM UPGRADE: Track A+ chain verification is production-ready');
    console.log('You may now claim: "Machine-verifiable chain continuity"');
    
    process.exit(0);

  } catch (error: any) {
    console.error('\n✗ TEST FAILED:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
    process.exit(1);
  }
}

runChainVerificationTests();
