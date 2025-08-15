import { Skill } from '@bb-companion/database';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class SkillsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<Skill[]> {
    return this.databaseService.skill.findMany();
  }

  async findOneByName(name: string): Promise<Skill | null> {
    return this.databaseService.skill.findUnique({
      where: { name },
    });
  }
}
