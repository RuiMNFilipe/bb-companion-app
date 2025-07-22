import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RacesModule } from './races/races.module';
import { PositionModule } from './position/position.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [RacesModule, PositionModule, SkillsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
