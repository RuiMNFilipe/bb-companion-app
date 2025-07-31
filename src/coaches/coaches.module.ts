import { Module } from '@nestjs/common';
import { CoachesService } from './coaches.service';

@Module({
  providers: [CoachesService]
})
export class CoachesModule {}
