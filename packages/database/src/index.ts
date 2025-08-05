// Export the Prisma client and all types
export * from '@prisma/client';
export {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library"

// Export the client instance
import { PrismaClient } from '@prisma/client';

// Create a singleton instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Export database utilities
export async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}

export async function disconnectDatabase() {
  await prisma.$disconnect();
}

// Export common database types and utilities
export type DatabaseError = {
  code: string;
  message: string;
};

export const handleDatabaseError = (error: any): DatabaseError => {
  if (error.code) {
    return {
      code: error.code,
      message: error.message || 'Database error occurred',
    };
  }
  return {
    code: 'UNKNOWN_ERROR',
    message: error.message || 'An unknown database error occurred',
  };
};
