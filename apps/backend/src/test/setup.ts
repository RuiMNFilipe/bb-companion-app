import { PrismaClient } from '@bb-companion/database/errors';

const prisma = new PrismaClient();

beforeAll(async () => {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error('❌ Tests must run with the NODE_ENV=test');
  }

  if (
    !process.env.DATABASE_URL?.includes('test') ||
    !process.env.DATABASE_URL?.includes('5433')
  ) {
    throw new Error('❌ DATABASE_URL must point to test database on port 5433');
  }

  console.log('🧪 Test environment validated');

  await waitForDatabase();
  console.log('✅ Test database ready');
});

beforeEach(async () => {
  await cleanDatabase();
});

afterAll(async () => {
  await prisma.$disconnect();
});

async function waitForDatabase(maxRetries = 30) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return;
    } catch (_error) {
      if (i === maxRetries - 1) {
        throw new Error(`Database not ready after ${maxRetries} attempts`);
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

async function cleanDatabase() {
  // Clean tables in correct order (respecting foreign keys)
  const tableNames = ['Player', 'Team', 'User']; // Add your tables here

  try {
    // Disable foreign key checks
    await prisma.$executeRaw`SET session_replication_role = 'replica';`;

    // Truncate all tables
    for (const tableName of tableNames) {
      await prisma.$executeRawUnsafe(
        `TRUNCATE TABLE "${tableName}" RESTART IDENTITY CASCADE;`,
      );
    }

    // Re-enable foreign key checks
    await prisma.$executeRaw`SET session_replication_role = 'origin';`;
  } catch (error) {
    console.error('Failed to clean database:', error);
    throw error;
  }
}
