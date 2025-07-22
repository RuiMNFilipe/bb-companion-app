import { Body, Injectable } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { DatabaseService } from 'src/database/database.service';
import { Position } from '@prisma/client';

@Injectable()
export class PositionService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(@Body() createPositionDto: CreatePositionDto) {
    return this.databaseService.position.create({ data: createPositionDto });
  }

  async findAll() {
    return this.databaseService.position.findMany();
  }

  async findOne(id: string) {
    return this.databaseService.position.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, updatePositionDto: UpdatePositionDto) {
    return this.databaseService.position.update({
      where: {
        id,
      },
      data: updatePositionDto,
    });
  }

  async remove(id: string) {
    return this.databaseService.position.delete({
      where: {
        id,
      },
    });
  }

  async findAllPositionsForRace(raceSlug: string): Promise<Position[]> {
    const race = await this.databaseService.race.findUnique({
      where: {
        slug: raceSlug,
      },
    });

    // TODO: handle race not found

    return await this.databaseService.position.findMany({
      where: {
        raceId: race!.id,
      },
    });
  }
}
