import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CoachesService } from 'src/coaches/coaches.service';
import { compare } from 'bcrypt-ts';
import { DatabaseService } from 'src/database/database.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly coachesService: CoachesService,
        private readonly db: DatabaseService,
        private readonly jwt: JwtService
    ) {}

    async signIn(username: string, password: string): Promise<{ access_token: string }> {
        const coach = await this.coachesService.findOneByUsername(username); 
        if (!coach) throw new NotFoundException("Coach not found");

        const isMatch = await compare(password, coach.passwordHash);
        if (!isMatch) throw new UnauthorizedException("Invalid password");

        const token = { sub: coach.id, username: coach.username }
        
        return { access_token: await this.jwt.signAsync(token) }
    }
}

