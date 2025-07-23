import { Expose } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class RaceDto {
  @Expose()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  description: string | null;

  @Expose()
  @IsNumber()
  @IsInt()
  @Min(0)
  rerollCost: number;

  @Expose()
  @IsBoolean()
  @IsNotEmpty()
  apothecaryAllowed: boolean;

  @Expose()
  @IsArray()
  @IsString({ each: true })
  pros: string[];

  @Expose()
  @IsArray()
  @IsString({ each: true })
  cons: string[];
}
