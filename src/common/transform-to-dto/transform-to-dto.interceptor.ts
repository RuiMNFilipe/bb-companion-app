import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformToDtoInterceptor<T> implements NestInterceptor<T, any> {
  constructor(private readonly classType: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(data => plainToInstance(this.classType, data, {
        excludeExtraneousValues: true,
      }))
    );
  }
}
