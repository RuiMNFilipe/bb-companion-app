import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
    const coachId = await this.db.coach.findUnique({
      where: { username: createTeamDto.coach },
      select: { id: true}
    })
    if (!coachId) {
      throw new NotFoundException("Coach not found. Could not create Team.")
    }

    const rosterId = await this.db.roster.findUnique({
      where: { slug: createTeamDto.roster_slug},
      select: { id: true }
    })
    if (!rosterId) {
      throw new NotFoundException("Roster not found. Could not create Team.")
    }

    if (createTeamDto.name.trim().length === 0){
      throw new BadRequestException("No team name was given.")
    }

    const assumedTreasury = createTeamDto.treasury;
    const assumedTeamValue = createTeamDto.team_value;

    return await this.db.team.create({
      data: {
        coach_id: coachId.id,
        roster_id: rosterId.id,
        name: createTeamDto.name,
        rerolls: createTeamDto.rerolls,
        dedicated_fans: createTeamDto.dedicated_fans,
        assistant_coaches: createTeamDto.assistant_coaches,
        cheerleaders: createTeamDto.cheerleaders,
        has_apothecary: createTeamDto.has_apothecary,
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
