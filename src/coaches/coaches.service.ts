import { Injectable } from '@nestjs/common';
import { Coach as PrismaCoach } from '@prisma/client';
import { UUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import winston, { exceptions } from 'winston';

export type Coach = PrismaCoach;

@Injectable()
export class CoachesService {
  constructor(private prisma: PrismaService) {}

  async findOneByUsername(username: string): Promise<Coach | null> {
    const coach = this.prisma.coach.findUnique({
      where: { username: username },
    });

    return coach !== null
    ? coach
    : (() => {
        winston.info('No coach was found with the given username ' + username);
        return null;
      })();
  }

  async findOneById(id: UUID): Promise<Coach | null> {
    const coach = this.prisma.coach.findUnique({
      where: { id: id },
    });

    return coach !== null
      ? coach
      : (() => {
          winston.info('No coach was found with the given id ' + id);
          return null;
        })();
  }
}
