import { IsBoolean, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
 
export class TeamDto {
  @IsUUID()
  @IsNotEmpty()
  coach: string;

  @IsUUID()
  @IsNotEmpty()
  roster_slug: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  win: number;

  @IsNumber()
  @IsNotEmpty()
  loss: number;

  @IsNumber()
  @IsNotEmpty()
  ties: number;

  @IsNumber()
  @IsNotEmpty()
  delta: number;

  @IsNumber()
  @IsNotEmpty()
  team_value: number;

  @IsNumber()
  @IsNotEmpty()
  treasury: number;

  @IsNotEmpty()
  players: PlayerDto[];

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

  @IsBoolean()
  @IsNotEmpty()
  is_experienced: boolean;

  @IsBoolean()
  @IsNotEmpty()
  is_suspended: boolean;

  @IsBoolean()
  @IsNotEmpty()
  is_deactivated: boolean;
}
