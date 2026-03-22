<<<<<<< HEAD
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env'), override: true });

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
=======
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config({ path: require('path').resolve(__dirname, '../../../.env'), override: true });

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
>>>>>>> acce792a55a573730087bf94e57f5f0608dd3e45
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
