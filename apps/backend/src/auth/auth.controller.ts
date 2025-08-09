import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Coach } from '@bb-companion/database';
import { CreateCoachDto } from 'src/coaches/dto/create-coach.dto';
import { JwtAuthGuard } from './passport/jwt.guard';
import { CurrentUser } from 'utils';
import { SessionResponse } from './types';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(
    @Req() req: { user: Coach },
    @Headers('user-agent') userAgent?: string,
    @Ip() ipAddress?: string,
  ) {
    return await this.authService.login(req.user, userAgent, ipAddress);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createCoachDto: CreateCoachDto) {
    return await this.authService.register(createCoachDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getProfile(
    @CurrentUser() user: Omit<Coach, 'password'>,
  ): Omit<Coach, 'password'> {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('verify')
  @HttpCode(HttpStatus.OK)
  verifyToken(@CurrentUser() user: Omit<Coach, 'password'>) {
    return {
      user,
      valid: true,
      expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: HttpStatus.OK,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(
    @CurrentUser() _user: Omit<Coach, 'password'>,
    @Headers('authorization') authorization?: string,
  ): Promise<void> {
    const token = authorization?.startsWith('Bearer ')
      ? authorization.substring(7)
      : null;

    if (!token) {
      throw new BadRequestException('Token not provided');
    }

    await this.authService.logout(token);
  }

  @Post('logout-all-devices')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logoutAllDevices(
    @CurrentUser() user: Omit<Coach, 'password'>,
  ): Promise<void> {
    await this.authService.logoutAllDevices(user.id);
  }

  @Post('refresh-token')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Headers('authorization') authorization?: string) {
    const token = authorization?.startsWith('Bearer ')
      ? authorization.substring(7)
      : null;

    if (!token) throw new BadRequestException('Token not provided');

    return await this.authService.refreshToken(token);
  }

  @Get('active-sessions')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getActiveSessions(
    @CurrentUser() user: Omit<Coach, 'password'>,
  ): Promise<{
    sessions: SessionResponse[];
    count: number;
  }> {
    const sessions = await this.authService.getUserActiveSessions(user.id);

    return {
      sessions,
      count: sessions.length,
    };
  }
}
