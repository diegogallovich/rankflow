import prisma from '../lib/prisma';

async function clearDatabase() {
  const tablesToClear = [
    'ai_transactions',
    'collection_fields',
    'collection_items',
    'collections',
    'sites',
    'onboarding_steps',
    'onboardings',
  ];

  for (const table of tablesToClear) {
    await prisma.$executeRawUnsafe(`TRUNCATE TABLE "${table}" CASCADE;`);
    console.log(`Cleared table: ${table}`);
  }

  await prisma.$disconnect();
  console.log('All tables cleared successfully.');
}

clearDatabase().catch((e) => {
  console.error('Error clearing database:', e);
  process.exit(1);
});
