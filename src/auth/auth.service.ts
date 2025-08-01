import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CoachesService } from 'src/coaches/coaches.service';
import { compare } from 'bcrypt-ts';
import { DatabaseService } from 'src/database/database.service';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
    constructor(
        private readonly coachesService: CoachesService,
        private readonly db: DatabaseService
    ) {}

    async signIn(username: string, password: string): Promise<any> {
        const coach = await this.coachesService.findOneByUsername(username); 
        if (!coach) throw new NotFoundException("Coach not found");

        const isMatch = await compare(password, coach.password);
        if (!isMatch) throw new UnauthorizedException("Invalid password");

        return coach;

    }
}

