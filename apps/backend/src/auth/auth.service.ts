import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Coach } from '@bb-companion/database';
import { hashPassword, validatePassword } from 'lib/password-hashing';
import { CoachesService } from 'src/coaches/coaches.service';
import { jwtConstants } from './passport/jwt.constants';
import { CreateCoachDto } from 'src/coaches/dto/create-coach.dto';
import { JwtPayload } from '@bb-companion/shared';

@Injectable()
export class AuthService {
  constructor(
    private readonly coachesService: CoachesService,
    private readonly jwtService: JwtService,
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

  async login(coach: Coach) {
    const payload: JwtPayload = { sub: coach.id, username: coach.username };
    const access_token = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
    });
    return { message: 'Login successful', access_token };
  }

  async register(createCoachDto: CreateCoachDto): Promise<Coach> {
    const { password, ...coachData } = createCoachDto;
    const hashedPassword = await hashPassword(password);

    const createdCoach = this.coachesService.create({
      ...coachData,
      password: hashedPassword,
    });

    return createdCoach;
  }

  async getCurrentUser(userId: string): Promise<Coach | null> {
    return await this.coachesService.findById(userId);
  }
}
