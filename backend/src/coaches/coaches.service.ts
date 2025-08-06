import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCoachDto } from './dto/create-coach.dto';
import { DatabaseService } from 'src/database/database.service';
import { Coach, PrismaClientKnownRequestError } from '@bb-companion/database';

@Injectable()
export class CoachesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createCoachDto: CreateCoachDto): Promise<Coach> {
    try {
      return await this.databaseService.coach.create({
        data: createCoachDto,
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Username already exists.');
      }
      throw error;
    }
  }

  async findByUsername(username: string): Promise<Coach | null> {
    return this.databaseService.coach.findUnique({
      where: {
        username,
      },
    });
  }

  async findById(id: string): Promise<Coach | null> {
    return this.databaseService.coach.findUnique({
      where: {
        id,
      },
    });
  }
}
