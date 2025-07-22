import { PartialType } from '@nestjs/mapped-types';
import { CreateRaceDto } from './create-race.dto';

export class UpdateSkillDto extends PartialType(CreateRaceDto) {}
