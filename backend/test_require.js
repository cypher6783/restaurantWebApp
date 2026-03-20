require('dotenv').config();

const { PrismaClient } = require('@prisma/client');

async function test() {
  console.log('Testing Way 1: No options');
  try {
    const p1 = new PrismaClient();
    console.log('Way 1 success');
  } catch (e) {
    console.log('Way 1 failed:', e.message);
  }

  console.log('Testing Way 2: datasource object');
  try {
    const p2 = new PrismaClient({
      datasource: { url: process.env.DATABASE_URL }
    });
    console.log('Way 2 success');
  } catch (e) {
    console.log('Way 2 failed:', e.message);
  }

  console.log('Testing Way 3: datasourceUrl property');
  try {
    const p3 = new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL
    });
    console.log('Way 3 success');
  } catch (e) {
    console.log('Way 3 failed:', e.message);
  }
}

test();
