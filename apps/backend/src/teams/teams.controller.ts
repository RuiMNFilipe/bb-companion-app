import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { JwtAuthGuard } from 'src/auth/passport/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.teamsService.findOneBySlug(slug);
  }
}
