import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { DatabaseService } from 'src/database/database.service';
import { Team as PrismaTeam } from '@prisma/client';
import { UUID } from 'crypto';

export type Team = PrismaTeam;

@Injectable()
export class TeamsService {
  constructor(private db: DatabaseService) {}
  
  async create(createTeamDto: CreateTeamDto) {
    const coachExists = await this.db.coach.findUnique({
      where: { id: createTeamDto.coach_id },
      select: { id: true}
    })

    if (!coachExists) {
      throw new NotFoundException("Coach not found. Could not create Team.")
    }

    return await this.db.team.create({
      data: {
        coach_id: createTeamDto.coach_id,
        roster_id: createTeamDto.roster_slug,
        name: createTeamDto.name,
        created_at: new Date(),
        updated_at: new Date(),
        deactivated: false
      }
    })
  }



  async findAll() {
    return await this.db.team.findMany({
      orderBy: {created_at: 'desc'}
    })
  }

  async findManyByCoach(coachName: string): Promise<Team[] | null> {
    const coach = await this.db.coach.findUnique({
      where: { username: coachName },
      select: { id: true }
    });

    if (!coach) {
      return [];
    }

    const teams = await this.db.team.findMany({
      where: { coach_id: coach.id },
      orderBy: { created_at: 'desc'}
    });

    return teams;
  }

  async findOneById(id: UUID): Promise<Team | null> {
    const team = await this.db.team.findUnique({
      where: { id: id },
    });

    return team;
  }

  //TODO: Implement Team Update
  async update(id: UUID, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  async deactivate(id: UUID) {
    return await this.db.team.update({
      where: { id },
      data: {
        is_deactivated: true,
        updated_at: new Date()
      }
    });
  }
}
