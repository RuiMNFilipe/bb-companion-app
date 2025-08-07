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

    const endTreasury: number = calculateEndTreasury()

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
        treasury: await calculateEndTreasury(rosterId.id, createTeamDto)
      }
    });

    async function getStaffCosts(rosterId: string, db: DatabaseService): Promise<{
      reroll_cost: number;
      dedicated_fans_cost: number;
      assistant_coach_cost: number;
      cheerleader_cost: number;
      apothecary_cost: number;
    }> {
      const costs = await db.roster.findFirst({
        where: { id: rosterId },
        select: {
          reroll_cost: true,
          dedicated_fans_cost: true,
          assistant_coach_cost: true,
          cheerleader_cost: true,
          apothecary_cost: true
        }
      });

      if (!costs) {
        throw new NotFoundException(`Could not find roster with ID: ${rosterId}`);
      }

      return costs;
    }

    async function getPositionalCosts(rosterId: string, createPlayerDtos: string[], db: DatabaseService) {
      const costs = await db.positionalRoster.findMany({
        where: { roster_id: rosterId },
        select: {
          
        }
      });

      if (!costs) {
        throw new NotFoundException(`Could not find roster with ID: ${rosterId}`);
      }

      return costs;
    }

    async function calculateEndTreasury(
      rosterId: string,
      createTeamDto: CreateTeamDto
    ): Promise<number> {

      const staffCosts = await getStaffCosts(rosterId, this.db)
      const playerCosts = await getPositionalCosts(rosterId, this.db)

      // Staff costs
      const rerollCost = createTeamDto.rerolls * staffCosts.reroll_cost;
      const dedicatedFansCost = createTeamDto.dedicated_fans * staffCosts.dedicated_fans_cost;
      const assistantCoachesCost = createTeamDto.assistant_coaches * staffCosts.assistant_coach_cost;
      const cheerleadersCost = createTeamDto.cheerleaders * staffCosts.cheerleader_cost;
      const apothecaryCost = createTeamDto.has_apothecary ? staffCosts.apothecary_cost : 0;

      // Player costs
      const players = this.db.positional.findMany({

      });
    }
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
