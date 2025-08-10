import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreatePlayerDto {
  @IsUUID()
  team_id: string;

  @IsString()
  @IsNotEmpty()
  position_slug: string;

  @IsString()
  @IsNotEmpty()
  name: string = "Unnamed Player";

  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  number: number;
}