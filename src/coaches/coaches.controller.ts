import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { UUID } from 'crypto';
import { CoachesService } from './coaches.service';

@Controller('coaches')
export class CoachesController {
    constructor(private readonly coachesService: CoachesService) {}
    
    // @UseInterceptors(LoggingInterceptor)
    @Get()
    getAll(){
        return this.coachesService.findAll();
    }
    @Get('id/:id')
    getById(@Param('id', ParseUUIDPipe) id: UUID) { 
        return this.coachesService.findOneById(id);
    }

    @Get('username/:username')
    getByUsername(@Param('username') username: string) { 
        return this.coachesService.findOneByUsername(username);
    }
}
