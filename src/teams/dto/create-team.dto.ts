import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  teamValue: number;

  @IsNumber()
  @IsNotEmpty()
  treasury: number;

  @IsNumber()
  @IsNotEmpty()
  rerolls: number;

  @IsNumber()
  @IsNotEmpty()
  dedicatedFans: number;

  @IsNumber()
  @IsNotEmpty()
  assistantCoaches: number;

  @IsNumber()
  @IsNotEmpty()
  cheerleaders: number;

  @IsBoolean()
  @IsNotEmpty()
  hasApothecary: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isExperienced: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isSuspended: boolean;
}
