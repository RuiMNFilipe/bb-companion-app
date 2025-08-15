import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateTeamDto {
  @IsUUID()
  @IsNotEmpty()
  team_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  deactivated?: boolean;
}