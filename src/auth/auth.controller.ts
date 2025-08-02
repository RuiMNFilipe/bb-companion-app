import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CoachDto } from 'src/coaches/dto/coach.dto';
import { TransformToDtoInterceptor } from 'src/common/transform-to-dto/transform-to-dto.interceptor';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UseInterceptors(new TransformToDtoInterceptor(CoachDto))
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body('username') username: string,
    @Body('password') pw: string,
  ) {
    return this.authService.signIn(username, pw);
  }
}