import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CoachDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  lastLogin: Date;
}