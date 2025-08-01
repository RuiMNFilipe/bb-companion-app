import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Coach } from '@prisma/client';
import { hashPassword, validatePassword } from 'lib/password-hashing';
import { CoachesService } from 'src/coaches/coaches.service';
import { jwtConstants } from './passport/jwt.constants';
import { CreateCoachDto } from 'src/coaches/dto/create-coach.dto';

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
    const coach = await this.coachesService.findOne(username);
    if (coach && (await validatePassword(password, coach.password))) {
      return coach;
    }

    return null;
  }

  async login(coach: Coach) {
    const payload = { sub: coach.id, username: coach.username };
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
}
