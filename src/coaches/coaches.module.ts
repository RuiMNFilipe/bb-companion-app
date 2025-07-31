import { Module } from '@nestjs/common';
import { CoachesService } from './coaches.service';
import { DatabaseModule } from 'src/database/database.module';
import { CoachesController } from './coaches.controller';

@Module({
  imports: [DatabaseModule],
  providers: [CoachesService],
  controllers: [CoachesController],
  exports: [CoachesService]
})
export class CoachesModule {}
