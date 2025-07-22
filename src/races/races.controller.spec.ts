import { Test, TestingModule } from '@nestjs/testing';
import { RacesController } from './races.controller';
import { RacesService } from './races.service';

describe('RacesController', () => {
  let controller: RacesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RacesController],
      providers: [RacesService],
    }).compile();

    controller = module.get<RacesController>(RacesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
