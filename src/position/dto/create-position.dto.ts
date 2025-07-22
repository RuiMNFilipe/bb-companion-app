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

export class CreatePositionDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsUUID()
  @IsNotEmpty()
  raceId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @Min(0)
  @IsInt()
  @IsNotEmpty()
  cost: number;

  @Min(0)
  @IsInt()
  @IsNotEmpty()
  movement: number;

  @Min(0)
  @IsInt()
  @IsNotEmpty()
  strength: number;

  @Min(0)
  @IsInt()
  @IsNotEmpty()
  agility: number;

  @IsOptional()
  @IsNumber()
  @IsInt()
  @Min(0)
  passing: number | null;

  @Min(0)
  @IsInt()
  @IsNotEmpty()
  armorValue: number;

  @Min(0)
  @IsInt()
  @IsNotEmpty()
  maxPerTeam: number;

  @IsArray()
  @IsString({ each: true })
  startingSkills: string[];
}
