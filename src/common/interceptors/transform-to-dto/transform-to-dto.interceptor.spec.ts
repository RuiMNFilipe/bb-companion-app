import { CoachDto } from 'src/coaches/dto/coach.dto';
import { TransformToDtoInterceptor } from './transform-to-dto.interceptor';

describe('TransformToDtoInterceptor', () => {
  it('should be defined', () => {
    expect(new TransformToDtoInterceptor(CoachDto)).toBeDefined();
  });
});
