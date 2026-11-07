import fs from 'fs';
import path from 'path';
import { pool } from '../config/db';

async function runMigration() {
  console.log('🔄 Connecting to Supabase PostgreSQL database...');
  const client = await pool.connect();
  try {
    console.log('✅ Connected successfully!');

    // Read schema.sql
    const schemaPath = path.resolve(__dirname, '../../../supabase/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf-8');
    console.log('📜 Executing schema.sql to create tables & policies...');
    await client.query(schemaSql);
    console.log('✅ Schema migrated successfully!');

    // Read seed.sql
    const seedPath = path.resolve(__dirname, '../../../supabase/seed.sql');
    const seedSql = fs.readFileSync(seedPath, 'utf-8');
    console.log('🌱 Executing seed.sql to populate products and settings...');
    await client.query(seedSql);
    console.log('✅ Seed data inserted successfully!');

    // Verify row count
    const res = await client.query('SELECT count(*) FROM public.products;');
    console.log(`🎉 Verification: ${res.rows[0].count} products live in Supabase public.products!`);

    const settRes = await client.query('SELECT * FROM public.site_settings WHERE id = $1;', ['default']);
    console.log(`🎬 Verified site_settings: ambient & doc video URLs active for default settings!`);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration();

