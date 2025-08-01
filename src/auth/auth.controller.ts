import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { randomUUID, UUID } from 'crypto';
import { CoachesService } from 'src/coaches/coaches.service';
import { CoachDto } from 'src/coaches/dto/coach.dto';
import { TransformToDtoInterceptor } from 'src/common/transform-to-dto/transform-to-dto.interceptor';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(new TransformToDtoInterceptor(CoachDto))
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body('username') username: string,
    @Body('password') pw: string,
  ) {
    return this.authService.signIn(username, pw);
  }
}