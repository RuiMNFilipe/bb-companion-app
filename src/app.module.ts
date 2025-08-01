import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
// import { StaticDataModule } from './static-data/static-data.module';
import { DatabaseModule } from './database/database.module';
import { CoachesModule } from './coaches/coaches.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WinstonModule.forRoot({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('Blood Bowl API', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        }),
      ],
    }),
    // StaticDataModule,
    DatabaseModule,
    CoachesModule,
    AuthModule,
    TeamsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
