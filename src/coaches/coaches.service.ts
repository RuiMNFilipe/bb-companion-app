import { Injectable, NotImplementedException } from '@nestjs/common';
import { Coach as PrismaCoach } from '@prisma/client';
import { UUID } from 'crypto';
import { DatabaseService } from 'src/database/database.service';
import winston, { exceptions } from 'winston';

export type Coach = PrismaCoach;

@Injectable()
export class CoachesService {
  constructor(private db: DatabaseService) {}

  async findAll(): Promise<Coach[]> {
    return this.db.coach.findMany({
      orderBy: {createdAt: 'desc'}
    })
  }

  async findOneByUsername(username: string): Promise<Coach | null> {
    const coach = this.db.coach.findUnique({
      where: { username: username },
    });

    return coach;
  }

  async findOneById(id: UUID): Promise<Coach | null> {
    const coach = this.db.coach.findUnique({
      where: { id: id },
    });

    return coach;
  }

  //TODO: Implement changePassword
  async changePassword() {
    throw new NotImplementedException()
  }
}
