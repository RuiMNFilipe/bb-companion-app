import { Injectable } from '@nestjs/common';
import { Prisma, Race } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateRaceDto } from './dto/create-race.dto';

@Injectable()
export class RacesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createRaceDto: CreateRaceDto): Promise<Race> {
    return await this.databaseService.race.create({
      data: createRaceDto,
    });
  }

  async findAll(): Promise<Race[]> {
    return await this.databaseService.race.findMany();
  }

  async findOne(id: string): Promise<Race | null> {
    return await this.databaseService.race.findUnique({
      where: { id },
    });
  }

  async update(
    id: string,
    updateRaceDto: Prisma.RaceUpdateInput,
  ): Promise<Race> {
    return await this.databaseService.race.update({
      where: {
        id,
      },
      data: updateRaceDto,
    });
  }

  async remove(id: string) {
    return await this.databaseService.race.delete({
      where: { id },
    });
  }
}
