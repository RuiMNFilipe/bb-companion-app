import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SkillDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  description: string | null;

  @Expose()
  @IsString()
  @IsNotEmpty()
  category: string;
}
