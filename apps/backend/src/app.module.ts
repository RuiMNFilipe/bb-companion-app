import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
<<<<<<< HEAD:src/app.module.ts
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { CoachesModule } from './coaches/coaches.module';
import { DatabaseService } from './database/database.service';
=======
// import { StaticDataModule } from './static-data/static-data.module';
import { DatabaseModule } from './database/database.module';
import { CoachesModule } from './coaches/coaches.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
>>>>>>> origin/develop:apps/backend/src/app.module.ts
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
<<<<<<< HEAD:src/app.module.ts
    DatabaseModule,
    AuthModule,
    CoachesModule,
    TeamsModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
  exports: [DatabaseService]
=======
    // StaticDataModule,
    DatabaseModule,
    CoachesModule,
    AuthModule,
    TeamsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
>>>>>>> origin/develop:apps/backend/src/app.module.ts
})
export class AppModule {}
