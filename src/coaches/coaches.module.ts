import { Module } from '@nestjs/common';
import { CoachesService } from './coaches.service';
import { DatabaseModule } from 'src/database/database.module';
import { CoachesController } from './coaches.controller';
import { CoachDto } from './dto/coach.dto';

@Module({
  imports: [DatabaseModule],
  providers: [CoachesService],
  controllers: [CoachesController],
  exports: [CoachesService, CoachDto]
})
export class CoachesModule {}
