import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ParseUUIDPipe } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { TransformToDtoInterceptor } from 'src/common/interceptors/transform-to-dto/transform-to-dto.interceptor';
import { UUID } from 'crypto';
import { TeamDto } from './dto/team.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Get()
  @UseInterceptors(new TransformToDtoInterceptor(TeamDto))
  findAll() {
    return this.teamsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe)  id: UUID) {
    const team = this.teamsService.findOneById(id);
    
  }

  @Patch(':id')
  update(@Param('id', ParseUUIDPipe)  id: UUID, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe)  id: UUID) {
    return this.teamsService.deactivate(id);
  }
}

function getCoachNameForTeam(teamObj: any) {

}
function getCoachSlugForTeam(teamObj: any) {

}
