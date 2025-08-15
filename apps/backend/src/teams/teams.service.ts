import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Team } from '@bb-companion/database';
import { TeamWithPositions } from '@bb-companion/shared';

@Injectable()
export class TeamsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<Team[]> {
    return this.databaseService.team.findMany();
  }

  async findOneBySlug(slug: string): Promise<TeamWithPositions | null> {
    const team = await this.databaseService.team.findUnique({
      where: {
        slug,
      },
      include: {
        positions: {
          select: {
            name: true,
            cost: true,
            quantity: true,
          },
        },
      },
    });

    if (!team) {
      throw new NotFoundException(
        `Team with slug "${slug}" not found or not accessible.`,
      );
    }

    return team;
  }
}
