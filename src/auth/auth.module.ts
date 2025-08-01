import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { CoachesModule } from 'src/coaches/coaches.module';
import { JwtStrategy } from './passport/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './passport/jwt.constants';
import { AuthService } from './auth.service';
import { CoachesService } from 'src/coaches/coaches.service';
import { LocalStrategy } from './passport/local.strategy';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtExpiredFilter } from './passport/jwtExpired.filter';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    CoachesModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    CoachesService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_INTERCEPTOR,
      useClass: JwtExpiredFilter,
    },
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
