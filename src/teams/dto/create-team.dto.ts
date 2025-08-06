import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreatePlayerDto } from 'src/players/create-player.dto';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  coach: string;

  @IsString()
  @IsNotEmpty()
  roster_slug: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  team_value: number;

  @IsNumber()
  @IsNotEmpty()
  treasury: number;

  @IsNotEmpty()
  players: CreatePlayerDto[]

  @IsNumber()
  @IsNotEmpty()
  rerolls: number;

  @IsNumber()
  @IsNotEmpty()
  dedicated_fans: number;

  @IsNumber()
  @IsNotEmpty()
  assistant_coaches: number;

  @IsNumber()
  @IsNotEmpty()
  cheerleaders: number;

  @IsBoolean()
  @IsNotEmpty()
  has_apothecary: boolean;
}
