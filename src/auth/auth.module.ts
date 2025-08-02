import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CoachesModule } from 'src/coaches/coaches.module';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [CoachesModule, DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'undefined_secret',
      signOptions: { expiresIn: "12h"}
    })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
