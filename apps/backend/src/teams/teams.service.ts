import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { DatabaseService } from 'src/database/database.service';
<<<<<<< HEAD:backend/src/teams/teams.service.ts
import { Team, PrismaClientKnownRequestError } from '@bb-companion/database';
=======
import { Team } from '@bb-companion/database';
import { PrismaClientKnownRequestError } from '@bb-companion/database/errors';
>>>>>>> refactor:apps/backend/src/teams/teams.service.ts

@Injectable()
export class TeamsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(
    createTeamDto: CreateTeamDto,
    coachUsername: string,
  ): Promise<Team> {
    return this.databaseService.team.create({
      data: {
        ...createTeamDto,
        coach: {
          connect: {
            username: coachUsername,
          },
        },
      },
    });
  }

  async findAllByCoach(coachUsername: string): Promise<Team[]> {
    return this.databaseService.team.findMany({
      where: {
        coach: {
          username: coachUsername,
        },
      },
    });
  }

  async findOne(teamId: string, coachUsername: string): Promise<Team | null> {
    const team = await this.databaseService.team.findUnique({
      where: {
        id: teamId,
        coach: {
          username: coachUsername,
        },
      },
    });

    if (!team) {
      throw new NotFoundException(
        `Team with ID "${teamId}" not found or not accessible.`,
      );
    }

    return team;
  }

  async update(
    teamId: string,
    updateTeamDto: UpdateTeamDto,
    coachUsername: string,
  ): Promise<Team> {
    try {
      return await this.databaseService.team.update({
        data: updateTeamDto,
        where: {
          id: teamId,
          coach: {
            username: coachUsername,
          },
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(
          `Team with ID ${teamId} not found or not accessible.`,
        );
      }
      throw error;
    }
  }

  async remove(teamId: string, coachUsername: string): Promise<Team> {
    try {
      return await this.databaseService.team.delete({
        where: {
          id: teamId,
          coach: {
            username: coachUsername,
          },
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(
          `Team with ID ${teamId} not found or not accessible.`,
        );
      }
      throw error;
    }
  }
}
