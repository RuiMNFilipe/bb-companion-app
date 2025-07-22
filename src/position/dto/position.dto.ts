import { Expose } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class PositionDto {
  @Expose()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsUUID()
  @IsNotEmpty()
  raceId: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNumber()
  @IsInt()
  @Min(0)
  cost: number;

  @Expose()
  @IsNumber()
  @IsInt()
  @Min(0)
  movement: number;

  @Expose()
  @IsNumber()
  @IsInt()
  @Min(0)
  strength: number;

  @Expose()
  @IsNumber()
  @IsInt()
  @Min(0)
  agility: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  passing: number | null;

  @Expose()
  @IsNumber()
  @IsInt()
  @Min(0)
  armorValue: number;

  @Expose()
  @IsNumber()
  @IsInt()
  @Min(0)
  maxPerTeam: number;

  @Expose()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  startingSkills: string[];
}
