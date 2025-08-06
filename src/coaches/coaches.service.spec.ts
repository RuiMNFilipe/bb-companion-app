import { Test, TestingModule } from '@nestjs/testing';
<<<<<<<< HEAD:apps/backend/src/teams/teams.service.spec.ts
import { TeamsService } from './teams.service';

describe('TeamsService', () => {
  let service: TeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeamsService],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
========
import { CoachesService } from './coaches.service';

describe('CoachesService', () => {
  let service: CoachesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CoachesService],
    }).compile();

    service = module.get<CoachesService>(CoachesService);
>>>>>>>> 5bdc5eea3773df25df271dcc2a81a51cb9f2a37a:src/coaches/coaches.service.spec.ts
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
