import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class SkillDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  category: string;
}
