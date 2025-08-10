import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './jwt.constants';
import { Coach } from '@bb-companion/database';
import { CoachesService } from 'src/coaches/coaches.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly coachesService: CoachesService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret!,
    });
  }

  async validate(payload: {
    sub: string;
    username: string;
    email: string;
  }): Promise<Omit<Coach, 'password'>> {
    const coach = await this.coachesService.findByUsername(payload.username);
    if (!coach) throw new UnauthorizedException('Coach not found');

    const { password: _password, ...result } = coach;
    return result;
  }
}
