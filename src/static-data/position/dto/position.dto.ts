import { JsonValue } from '@prisma/client/runtime/library';
import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';

export class SkillEntryDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  skillName: string;

  @Expose()
  @IsOptional()
  @IsString()
  value: string | null;
}

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
  @ValidateNested({ each: true })
  @Type(() => SkillEntryDto)
  startingSkills: JsonValue;
}
