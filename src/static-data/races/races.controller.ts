import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RacesService } from './races.service';
import { CreateRaceDto } from './dto/create-race.dto';
import { RaceDto } from './dto/race.dto';
import { PositionService } from 'src/static-data/position/position.service';
import { PositionDto } from 'src/static-data/position/dto/position.dto';
import { UpdateRaceDto } from './dto/update-race.dto';

@Controller('races')
export class RacesController {
  constructor(
    private readonly racesService: RacesService,
    private readonly positionService: PositionService,
  ) {}

  @Post()
  create(@Body() createRaceDto: CreateRaceDto): Promise<RaceDto> {
    return this.racesService.create(createRaceDto);
  }

  @Get()
  findAll(): Promise<RaceDto[]> {
    return this.racesService.findAll();
  }

  @Get(':raceSlug/positions')
  findAllPositionForRace(
    @Param('raceSlug') raceSlug: string,
  ): Promise<PositionDto[]> {
    return this.positionService.findAllPositionsForRace(raceSlug);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<RaceDto | null> {
    return this.racesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRaceDto: UpdateRaceDto,
  ): Promise<RaceDto> {
    return this.racesService.update(id, updateRaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<RaceDto> {
    return this.racesService.remove(id);
  }
}
