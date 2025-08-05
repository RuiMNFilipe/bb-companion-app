import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Prisma, prisma, PrismaClient } from '@bb-companion/database';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  get client(): PrismaClient {
    return prisma;
  }

  get coach(): Prisma.CoachDelegate {
    return prisma.coach;
  }

  get team(): Prisma.TeamDelegate {
    return prisma.team;
  }

  async onModuleInit() {
    await prisma.$connect();
  }

  async onModuleDestroy() {
    await prisma.$disconnect();
  }
}
