import { Module } from '@nestjs/common';
import { RacesModule } from './races/races.module';
import { PositionModule } from './position/position.module';
import { SkillsModule } from './skills/skills.module';

@Module({
  imports: [RacesModule, PositionModule, SkillsModule],
  exports: [RacesModule, PositionModule, SkillsModule],
})
export class StaticDataModule {}
