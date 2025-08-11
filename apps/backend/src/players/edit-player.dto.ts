import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';
import { PlayerStatus } from './player-status';
import { UUID } from 'crypto';

export class EditPlayerDto {
  @IsUUID()
  @IsNotEmpty()
  id: UUID;

  @IsString()
  @IsNotEmpty()
  name: string;

//TODO: Player Number needs to be changed via its own endpoint. They can only be swapped with an already existing one

  @IsEnum(PlayerStatus)
  @IsNotEmpty()
  status: PlayerStatus;
}