import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { CoachesModule } from 'src/coaches/coaches.module';
import { JwtStrategy } from './passport/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './passport/jwt.constants';
import { AuthService } from './auth.service';
import { LocalStrategy } from './passport/local.strategy';
import { APP_FILTER } from '@nestjs/core';
import { JwtExpiredFilter } from './passport/jwtExpired.filter';
import { SessionService } from './session.service';

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
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      provide: APP_FILTER,
      useClass: JwtExpiredFilter,
    },

    SessionService,
  ],
  exports: [AuthService, JwtModule, SessionService],
})
export class AuthModule {}
