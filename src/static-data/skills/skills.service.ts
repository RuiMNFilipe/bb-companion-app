import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { DatabaseService } from 'src/database/database.service';
import { Skill } from '@prisma/client';

@Injectable()
export class SkillsService {
  private readonly logger = new Logger(SkillsService.name);
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createSkillDto: CreateSkillDto): Promise<Skill> {
    this.logger.log(`Attempting to create a new skill...`);
    try {
      const createdSkill = await this.databaseService.skill.create({
        data: createSkillDto,
      });
      this.logger.log(`Successfully created Skill ${createdSkill.name}}`);
      return createdSkill;
    } catch (error) {
      this.logger.error(
        `Failed to create Skill ${CreateSkillDto.name}. Error: ${error}`,
      );
      throw error;
    }
  }

  async findAll(): Promise<Skill[]> {
    this.logger.log(`Fetching all skills...`);
    try {
      const allSkills = await this.databaseService.skill.findMany();
      if (allSkills.length === 0) {
        this.logger.warn('No skills found in the database.');
        throw new NotFoundException('No skills found.');
      }
      return allSkills;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(`Failed to fetch all skills. Error: ${error}.`);
      }
      throw error;
    }
  }

  async findOne(skillSlug: string): Promise<Skill | null> {
    this.logger.log(`Attempting to find skill: ${skillSlug}`);
    try {
      const skill = await this.databaseService.skill.findUnique({
        where: {
          slug: skillSlug,
        },
      });
      if (!skill) {
        this.logger.warn(`Skill ${skillSlug}" not found.`);
        throw new NotFoundException(`Skill"${skillSlug}" not found.`);
      }
      this.logger.log(`Found skill ${skill.name}`);
      return skill;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        this.logger.error(
          `Failed to find skill "${skillSlug}". Error: ${error}.`,
        );
      }
      throw error;
    }
  }

  async update(
    skillSlug: string,
    updateSkillDto: UpdateSkillDto,
  ): Promise<Skill> {
    this.logger.log(`Attempting to update skill ${skillSlug}`);
    try {
      const updatedSkill = await this.databaseService.skill.update({
        where: {
          slug: skillSlug,
        },
        data: updateSkillDto,
      });
      this.logger.log(`Successfully updated skill ${updatedSkill.name}`);
      return updatedSkill;
    } catch (error) {
      this.logger.error(`Failed to update skill ${skillSlug}. Error: ${error}`);
      throw error;
    }
  }

  async remove(skillSlug: string): Promise<Skill> {
    this.logger.log(`Attempting to remove skill ${skillSlug}`);
    try {
      const deletedSkill = await this.databaseService.skill.delete({
        where: {
          slug: skillSlug,
        },
      });
      this.logger.log(`Successfully removed skill ${deletedSkill.name}`);
      return deletedSkill;
    } catch (error) {
      this.logger.error(`Failed to remove skill ${skillSlug}. Error: ${error}`);
      throw error;
    }
  }
}
