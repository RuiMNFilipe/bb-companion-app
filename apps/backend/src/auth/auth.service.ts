import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Coach } from '@bb-companion/database';
import { hashPassword, validatePassword } from 'lib/password-hashing';
import { CoachesService } from 'src/coaches/coaches.service';
import { jwtConstants } from './passport/jwt.constants';
import { CreateCoachDto } from 'src/coaches/dto/create-coach.dto';
import { JwtPayload } from '@bb-companion/shared';
import { SessionService } from './session.service';
import { DatabaseService } from 'src/database/database.service';
import { SessionResponse } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly coachesService: CoachesService,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
    private readonly databaseService: DatabaseService,
  ) {}

  async validateCoach(
    username: string,
    password: string,
  ): Promise<Coach | null> {
    const coach = await this.coachesService.findByUsername(username);
    if (coach && (await validatePassword(password, coach.password))) {
      return coach;
    }

    return null;
  }

  async login(
    coach: Coach,
    deviceInfo?: string,
    ipAddress?: string,
  ): Promise<{
    access_token: string;
    coach: {
      id: string;
      email: string;
      username: string;
    };
  }> {
    try {
      const payload: JwtPayload = {
        sub: coach.id,
        username: coach.username,
        email: coach.email,
      };
      const access_token = await this.jwtService.signAsync(payload, {
        secret: jwtConstants.secret,
      });

      await this.sessionService.createSession({
        userId: coach.id,
        token: access_token,
        deviceInfo,
        ipAddress,
      });

      await this.databaseService.coach.update({
        where: {
          id: coach.id,
        },
        data: { lastLogin: new Date() },
      });

      const { id, email, username } = coach;

      return { access_token, coach: { id, email, username } };
    } catch (error) {
      console.error('Login error:', error);
      throw new UnauthorizedException('Login failed');
    }
  }

  async register(createCoachDto: CreateCoachDto): Promise<Coach> {
    try {
      const existingCoach = await this.coachesService.findByUsername(
        createCoachDto.username,
      );
      const existingEmail = existingCoach?.email;

      if (existingCoach) {
        throw new ConflictException('Username already exists');
      }

      if (createCoachDto.email === existingEmail) {
        throw new ConflictException('Email already in use');
      }

      const { password, ...coachData } = createCoachDto;
      const hashedPassword = await hashPassword(password);

      const createdCoach = await this.coachesService.create({
        ...coachData,
        password: hashedPassword,
      });

      const { password: _, ...safeCoach } = createdCoach;

      return safeCoach as Coach;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    }
  }

  async getCurrentUser(userId: string): Promise<Coach> {
    const coach = await this.coachesService.findById(userId);

    if (!coach) {
      throw new UnauthorizedException('Coach not found');
    }

    return coach;
  }

  async logout(token: string): Promise<void> {
    try {
      await this.sessionService.invalidateSession(token);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async logoutAllDevices(userId: string): Promise<void> {
    try {
      await this.sessionService.invalidateAllUserSessions(userId);
    } catch (error) {
      console.error('Logout all devices error:', error);
      throw new Error('Failed to logout from all devices');
    }
  }

  async isTokenValid(token: string): Promise<boolean> {
    try {
      return this.sessionService.isSessionValid(token);
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  }

  async getUserActiveSessions(userId: string): Promise<SessionResponse[]> {
    try {
      return this.sessionService.getUserActiveSessions(userId);
    } catch (error) {
      console.error('Get active sessions error:', error);
      throw new Error('Failed to retrieve active sessions');
    }
  }

  async refreshToken(oldToken: string) {
    try {
      await this.sessionService.invalidateSession(oldToken);

      const decoded: JwtPayload = this.jwtService.decode(oldToken);
      const coach = await this.coachesService.findById(decoded.sub);

      if (!coach) {
        throw new UnauthorizedException('Coach not found');
      }

      return await this.login(coach);
    } catch (error) {
      console.error('Token refresh error:', error);
      throw new UnauthorizedException('Token refresh failed');
    }
  }
}
