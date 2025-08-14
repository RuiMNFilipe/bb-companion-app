import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Team } from '@bb-companion/database';

@Injectable()
export class TeamsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<Team[]> {
    return this.databaseService.team.findMany();
  }

  async findOneBySlug(slug: string): Promise<Team | null> {
    const team = await this.databaseService.team.findUnique({
      where: {
        slug,
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
