import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Race } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { CreateRaceDto } from './dto/create-race.dto';
import { UpdateRaceDto } from './dto/update-race.dto';

@Injectable()
export class RacesService {
  private readonly logger = new Logger(RacesService.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async create(createRaceDto: CreateRaceDto): Promise<Race> {
    this.logger.log(`Attempting to create a new race: ${createRaceDto.name}`);

    try {
      const newRace = await this.databaseService.race.create({
        data: createRaceDto,
      });
      this.logger.log(
        `Successfully created race with ID: ${newRace.id} - ${newRace.name}`,
      );
      return newRace;
    } catch (error) {
      this.logger.error(
        `Failed to create race ${createRaceDto.name}. Error: ${error}`,
      );
      throw error;
    }
  }

  async findAll(): Promise<Race[]> {
    this.logger.log(`Fetching all races...`);
    try {
      const races = await this.databaseService.race.findMany();
      if (races.length === 0) {
        this.logger.warn('No races found in the database.');
        throw new NotFoundException('No races found.');
      }

      this.logger.log(`Found ${races.length} races.`);
      return races;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(`Failed to fetch all races. Error: ${error}.`);
      }
      throw error;
    }
  }

  async findOne(id: string): Promise<Race | null> {
    this.logger.log(`Attempting to find race with ID: ${id}`);
    try {
      const race = await this.databaseService.race.findUnique({
        where: { id },
      });

      if (!race) {
        this.logger.warn(`Race with ID "${id}" not found.`);
        throw new NotFoundException(`Race with ID "${id}" not found.`);
      }
      this.logger.log(`Found race with ID: ${id} - ${race.name}`);
      return race;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(
          `Failed to find race with ID "${id}". Error: ${error}.`,
        );
      }
      throw error;
    }
  }

  async update(id: string, updateRaceDto: UpdateRaceDto): Promise<Race> {
    this.logger.log(`Attempting to update race with ID: ${id}`);
    try {
      const updatedRace = await this.databaseService.race.update({
        where: {
          id,
        },
        data: updateRaceDto,
      });
      this.logger.log(
        `Successfully updated race with ID: ${id} - ${updatedRace.name}`,
      );
      return updatedRace;
    } catch (error) {
      this.logger.error(
        `Failed to update race with ID "${id}". Error: ${error}`,
      );
      throw error;
    }
  }

  async remove(id: string) {
    this.logger.log(`Attempting to remove race with ID: ${id}`);
    try {
      const deletedRace = await this.databaseService.race.delete({
        where: { id },
      });
      this.logger.log(
        `Successfully removed race with ID: ${id} - ${deletedRace.name}`,
      );
      return deletedRace;
    } catch (error) {
      this.logger.error(
        `Failed to remove race with ID "${id}". Error: ${error}`,
      );
      throw error;
    }
  }
}
