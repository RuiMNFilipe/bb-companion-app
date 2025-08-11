import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformToDtoInterceptor<T> implements NestInterceptor<T, any> {
  constructor(private readonly classType: any) {}

intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
  return next.handle().pipe(
    map(data => {
      if (Array.isArray(data)) {
        return data.map(item => plainToInstance(this.classType, item));
      } else {
        return plainToInstance(this.classType, data);
      }
    }),
  );
}
}
