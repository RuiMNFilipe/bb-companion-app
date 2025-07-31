import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CoachesModule } from 'src/coaches/coaches.module';

@Module({
  imports: [CoachesModule],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
