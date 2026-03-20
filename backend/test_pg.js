require('dotenv').config();
console.log('DATABASE_URL:', process.env.DATABASE_URL);

const { Pool } = require('pg');
try {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  console.log('Pool config parsed:', {
    user: pool.options.user,
    host: pool.options.host,
    database: pool.options.database,
    password: typeof pool.options.password
  });
} catch (err) {
  console.error(err);
}
