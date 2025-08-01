import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Coach } from '@prisma/client';
import { CreateCoachDto } from 'src/coaches/dto/create-coach.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: { user: Coach }) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() createCoachDto: CreateCoachDto) {
    return this.authService.register(createCoachDto);
  }
}
