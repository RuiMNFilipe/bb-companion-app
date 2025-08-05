import { Test, TestingModule } from '@nestjs/testing';
import { CoachesController } from './coaches.controller';

describe('CoachesController', () => {
  let controller: CoachesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CoachesController],
    }).compile();

    controller = module.get<CoachesController>(CoachesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
