import 'dotenv/config';
import { query } from '../src/db';

async function findGenesis() {
  // Find entries with genesis previous_chain_hash
  const genesisHash = '0000000000000000000000000000000000000000000000000000000000000000';
  
  const result = await query(`
    SELECT rpx_id, system_id, created_at, previous_chain_hash
    FROM rpx_entries 
    WHERE system_id = $1
    AND previous_chain_hash = $2
    ORDER BY created_at ASC
    LIMIT 1
  `, ['trading-prod', genesisHash]);
  
  if (result.rows.length > 0) {
    console.log('Found genesis entry for trading-prod:');
    console.log(result.rows[0]);
  } else {
    console.log('NO GENESIS ENTRY FOUND for trading-prod!');
    console.log('\nLet me find the oldest entry...');
    
    const oldest = await query(`
      SELECT rpx_id, system_id, created_at, 
             substring(chain_hash, 1, 16) as ch,
             substring(previous_chain_hash, 1, 16) as pch
      FROM rpx_entries 
      WHERE system_id = $1
      ORDER BY created_at ASC
      LIMIT 1
    `, ['trading-prod']);
    
    console.log('Oldest trading-prod entry:');
    console.log(oldest.rows[0]);
    console.log('\nThis entry points to:', oldest.rows[0].pch);
    
    // Check if that hash exists
    const prevExists = await query(`
      SELECT rpx_id, system_id FROM rpx_entries 
      WHERE chain_hash LIKE $1
    `, [oldest.rows[0].pch + '%']);
    
    if (prevExists.rows.length > 0) {
      console.log('Previous entry exists:', prevExists.rows[0]);
    } else {
      console.log('Previous entry does NOT exist - chain is orphaned!');
    }
  }
  
  process.exit(0);
}

findGenesis();
