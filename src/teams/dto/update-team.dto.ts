import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { CreatePlayerDto } from 'src/players/create-player.dto';

export class UpdateTeamDto {
  @IsUUID()
  @IsNotEmpty()
  team_id: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
