import { Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { DatabaseService } from 'src/database/database.service';
import { Skill } from '@prisma/client';

@Injectable()
export class SkillsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    return await this.databaseService.skill.create({
      data: createSkillDto,
    });
  }

  async findAll(): Promise<Skill[]> {
    return await this.databaseService.skill.findMany();
  }

  async findOne(skillSlug: string): Promise<Skill | null> {
    return await this.databaseService.skill.findUnique({
      where: {
        slug: skillSlug,
      },
    });
  }

  async update(
    skillSlug: string,
    updateSkillDto: UpdateSkillDto,
  ): Promise<Skill> {
    return this.databaseService.skill.update({
      where: {
        slug: skillSlug,
      },
      data: updateSkillDto,
    });
  }

  async remove(skillSlug: string): Promise<Skill> {
    return await this.databaseService.skill.delete({
      where: {
        slug: skillSlug,
      },
    });
  }
}
