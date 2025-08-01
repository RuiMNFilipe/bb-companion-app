import { Injectable } from '@nestjs/common';
import { CreateCoachDto } from './dto/create-coach.dto';
import { DatabaseService } from 'src/database/database.service';
import { Coach } from '@prisma/client';

@Injectable()
export class CoachesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCoachDto: CreateCoachDto): Promise<Coach> {
    return this.databaseService.coach.create({
      data: createCoachDto,
    });
  }

  async findOne(username: string): Promise<Coach | null> {
    return this.databaseService.coach.findUnique({
      where: {
        username,
      },
    });
  }
}
