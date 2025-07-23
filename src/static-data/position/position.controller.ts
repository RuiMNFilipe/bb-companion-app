import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PositionService } from './position.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';
import { PositionDto } from './dto/position.dto';

@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  create(@Body() createPositionDto: CreatePositionDto): Promise<PositionDto> {
    return this.positionService.create(createPositionDto);
  }

  @Get()
  findAll(): Promise<PositionDto[]> {
    return this.positionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PositionDto | null> {
    return this.positionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto,
  ): Promise<PositionDto> {
    return this.positionService.update(id, updatePositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<PositionDto> {
    return this.positionService.remove(id);
  }
}
