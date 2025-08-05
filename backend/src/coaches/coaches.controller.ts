import { Controller, Get, Query } from '@nestjs/common';
import { CoachesService } from './coaches.service';

@Controller('coaches')
export class CoachesController {
  constructor(private readonly coachesService: CoachesService) {}

  @Get('check-username')
  async checkUsername(@Query('username') username: string): Promise<boolean> {
    const coach = await this.coachesService.findByUsername(username);
    return coach !== null;
  }
}
