import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { SkillDto } from './dto/skill.dto';
import { plainToInstance } from 'class-transformer';

@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Post()
  create(@Body() createSkillDto: CreateSkillDto): Promise<SkillDto> {
    return this.skillsService.create(createSkillDto);
  }

  @Get()
  async findAll(): Promise<SkillDto[]> {
    const skills = this.skillsService.findAll();
    return (await skills).map((skill) => plainToInstance(SkillDto, skill));
  }

  @Get(':skillSlug')
  findOne(@Param('skillSlug') skillSlug: string): Promise<SkillDto | null> {
    return this.skillsService.findOne(skillSlug);
  }

  @Patch(':skillSlug')
  update(
    @Param('skillSlug') skillSlug: string,
    @Body() updateSkillDto: UpdateSkillDto,
  ): Promise<SkillDto> {
    return this.skillsService.update(skillSlug, updateSkillDto);
  }

  @Delete(':skillSlug')
  remove(@Param('skillSlug') skillSlug: string): Promise<SkillDto> {
    return this.skillsService.remove(skillSlug);
  }
}
