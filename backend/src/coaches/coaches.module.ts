import { Module } from '@nestjs/common';
import { CoachesService } from './coaches.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CoachesService],
  exports: [CoachesService],
})
export class CoachesModule {}
