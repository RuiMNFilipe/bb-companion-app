import { Module } from '@nestjs/common';
import { RacesService } from './races.service';
import { RacesController } from './races.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PositionModule } from 'src/static-data/position/position.module';

@Module({
  imports: [DatabaseModule, PositionModule],
  controllers: [RacesController],
  providers: [RacesService],
})
export class RacesModule {}
