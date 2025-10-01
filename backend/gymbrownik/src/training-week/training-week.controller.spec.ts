import { Test, TestingModule } from '@nestjs/testing';
import { TrainingWeekController } from './training-week.controller';
import { TrainingWeekService } from './training-week.service';

describe('TrainingWeekController', () => {
  let controller: TrainingWeekController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainingWeekController],
      providers: [TrainingWeekService],
    }).compile();

    controller = module.get<TrainingWeekController>(TrainingWeekController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
