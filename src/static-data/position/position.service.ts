import { Body, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { DatabaseService } from 'src/database/database.service';
import { Position } from '@prisma/client';

@Injectable()
export class PositionService {
  private readonly logger = new Logger(PositionService.name);
  constructor(private readonly databaseService: DatabaseService) {}

  async create(
    @Body() createPositionDto: CreatePositionDto,
  ): Promise<Position> {
    this.logger.log(`Attempting to create a new position...`);
    try {
      const createdPosition = await this.databaseService.position.create({
        data: createPositionDto,
      });
      this.logger.log(`Successfully created Position ${createdPosition.name}}`);
      return createdPosition;
    } catch (error) {
      this.logger.error(
        `Failed to create Position ${CreatePositionDto.name}. Error: ${error}`,
      );
      throw error;
    }
  }

  async findAll(): Promise<Position[]> {
    this.logger.log(`Fetching all positions...`);
    try {
      const allPositions = await this.databaseService.position.findMany();
      if (allPositions.length === 0) {
        this.logger.warn('No positions found in the database.');
        throw new NotFoundException('No positions found.');
      }
      return allPositions;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(`Failed to fetch all positions. Error: ${error}.`);
      }
      throw error;
    }
  }

  async findOne(id: string): Promise<Position> {
    this.logger.log(`Attempting to find position with ID: ${id}`);
    try {
      const position = await this.databaseService.position.findUnique({
        where: {
          id,
        },
      });

      if (!position) {
        this.logger.warn(`Position with ID "${id}" not found.`);
        throw new NotFoundException(`Position with ID "${id}" not found.`);
      }

      this.logger.log(`Found position with ID: ${id} - ${position.name}`);
      return position;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(
          `Failed to find position with ID "${id}". Error: ${error}.`,
        );
      }
      throw error;
    }
  }

  async update(
    id: string,
    updatePositionDto: UpdatePositionDto,
  ): Promise<Position> {
    this.logger.log(`Attempting to update position with ID: ${id}`);
    try {
      const updatedPosition = await this.databaseService.position.update({
        where: {
          id,
        },
        data: updatePositionDto,
      });
      this.logger.log(
        `Successfully updated position with ID: ${id} - ${updatedPosition.name}`,
      );
      return updatedPosition;
    } catch (error) {
      this.logger.error(
        `Failed to update position with ID "${id}". Error: ${error}`,
      );
      throw error;
    }
  }

  async remove(id: string): Promise<Position> {
    this.logger.log(`Attempting to remove position with ID: ${id}`);
    try {
      const deletedPosition = await this.databaseService.position.delete({
        where: {
          id,
        },
      });
      this.logger.log(
        `Successfully removed position with ID: ${id} - ${deletedPosition.name}`,
      );
      return deletedPosition;
    } catch (error) {
      this.logger.error(
        `Failed to remove position with ID "${id}". Error: ${error}`,
      );
      throw error;
    }
  }

  async findAllPositionsForRace(raceSlug: string): Promise<Position[]> {
    this.logger.log(`Attempting to find all positions of ${raceSlug}...`);

    try {
      const race = await this.databaseService.race.findUnique({
        where: {
          slug: raceSlug,
        },
      });

      if (!race) {
        this.logger.warn(`Race ${raceSlug} not found.`);
        throw new NotFoundException(`Race ${raceSlug} not found.`);
      }

      this.logger.log(`Found race ${race.name}`);
      this.logger.log(`Looking for all of ${race.name}'s positions...`);
      const racePositions = await this.databaseService.position.findMany({
        where: {
          raceId: race.id,
        },
      });
      this.logger.log(
        `Found ${racePositions.length} positions for ${race.name}`,
      );
      return racePositions;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(
          `Failed to find positions for ${raceSlug}. Error: ${error}`,
        );
      }
      throw error;
    }
  }
}
