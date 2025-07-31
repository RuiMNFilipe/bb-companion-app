import { Controller, Get } from '@nestjs/common';
import { randomUUID, UUID } from 'crypto';
import { CoachesService } from 'src/coaches/coaches.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly coachesService: CoachesService){}
  
}

