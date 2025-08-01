import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Coach } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/passport/jwt.guard';

@UseGuards(JwtAuthGuard)
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto, @Req() req: { user: Coach }) {
    const coachUsername = req.user.username;
    return this.teamsService.create(createTeamDto, coachUsername);
  }

  @Get()
  findAll(@Req() req: { user: Coach }) {
    const coachUsername = req.user.username;
    return this.teamsService.findAllByCoach(coachUsername);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: { user: Coach }) {
    const coachUsername = req.user.username;
    return this.teamsService.findOne(id, coachUsername);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto,
    @Req() req: { user: Coach },
  ) {
    const coachUsername = req.user.username;
    return this.teamsService.update(id, updateTeamDto, coachUsername);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: { user: Coach }) {
    const coachUsername = req.user.username;
    return this.teamsService.remove(id, coachUsername);
  }
}
