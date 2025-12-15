import 'dotenv/config';
import { query } from '../src/db';

async function debugChain() {
  const result = await query(`
    SELECT 
      rpx_id, 
      system_id,
      substring(chain_hash, 1, 16) as ch,
      substring(previous_chain_hash, 1, 16) as pch,
      created_at
    FROM rpx_entries 
    WHERE system_id = $1
    ORDER BY created_at DESC 
    LIMIT 10
  `, ['trading-prod']);
  
  console.log('Recent trading-prod entries:');
  console.table(result.rows);
  
  // Check if any previous hashes exist
  for (const row of result.rows) {
    const pch = row.pch;
    if (pch === '0000000000000000') {
      console.log(`\n${row.rpx_id} → GENESIS (first entry for trading-prod)`);
    } else {
      const prevExists = await query(`
        SELECT rpx_id FROM rpx_entries 
        WHERE substring(chain_hash, 1, 16) = $1
      `, [pch]);
      
      if (prevExists.rows.length === 0) {
        console.log(`\n${row.rpx_id} → ORPHANED! Previous ${pch} doesn't exist`);
      } else {
        console.log(`\n${row.rpx_id} → ${prevExists.rows[0].rpx_id} ✓`);
      }
    }
  }
  
  process.exit(0);
}

debugChain();
