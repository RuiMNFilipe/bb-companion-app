import { Controller, Get, Param, ParseUUIDPipe, UseInterceptors } from '@nestjs/common';
import { UUID } from 'crypto';
import { CoachesService } from './coaches.service';
import winston from 'winston';
import { TransformToDtoInterceptor } from 'src/common/interceptors/transform-to-dto/transform-to-dto.interceptor';
import { CoachDto } from './dto/coach.dto';

@Controller('coaches')
export class CoachesController {
    constructor(private readonly coachesService: CoachesService) {}
    
    // @UseInterceptors(LoggingInterceptor) 
    @Get()
    @UseInterceptors(new TransformToDtoInterceptor(CoachDto))
    getAll(){
        return this.coachesService.findAll();
    }

    @Get('id/:id')
    @UseInterceptors(new TransformToDtoInterceptor(CoachDto))
    getById(@Param('id', ParseUUIDPipe) id: UUID) { 
      const coach = this.coachesService.findOneById(id);
      return coach !== null
      ? coach
      : (() => {
          winston.info('No coach was found with the given id ' + id);
          return null;
        })();
    }

    @Get('username/:username')
    @UseInterceptors(new TransformToDtoInterceptor(CoachDto))
    getByUsername(@Param('username') username: string) { 
      const coach = this.coachesService.findOneByUsername(username);
      
      return coach !== null
        ? coach
        : (() => {
            winston.info('No coach was found with the given username ' + username);
            return null;
      })();
    }
}