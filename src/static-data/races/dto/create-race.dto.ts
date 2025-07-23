import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { CreatePositionDto } from 'src/static-data/position/dto/create-position.dto';

export class CreateRaceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  apothecaryAllowed: boolean;

  @IsInt()
  @Min(0)
  rerollCost: number;

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  pros: string[];

  @IsArray()
  @IsNotEmpty()
  @IsString({ each: true })
  cons: string[];

  @IsArray()
  @Type(() => CreatePositionDto)
  position: { create: CreatePositionDto[] };
}
