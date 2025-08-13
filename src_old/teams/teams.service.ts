import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { DatabaseService } from './database/database.service';
import { Team as PrismaTeam } from '@prisma/client';
import { UUID } from 'crypto';

export type Team = PrismaTeam;

@Injectable()
export class TeamsService {
  constructor(private db: DatabaseService) {}
  
  async create(createTeamDto: CreateTeamDto) {
    const coachId = await this.db.coach.findUnique({
      where: { username: createTeamDto.coach },
      select: { id: true }
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
        treasury: await calculateFinalTreasury(rosterId.id, createTeamDto)
      }
    });


    async function calculateFinalTreasury(
      rosterId: string,
      createTeamDto: CreateTeamDto
    ): Promise<number> {

      const staffCosts = await getStaffCosts(rosterId, this.db)
      const playerCosts = await getPositionalCosts(rosterId, this.db)

      // TODO: Get TV from Ruleset (unimplemented)
      // Checking Staff and Player costs vs allowed TV
      return 1_000_000 - staffCosts - playerCosts
      
      // const rerollCost = createTeamDto.rerolls * staffCosts.reroll_cost;
      // const dedicatedFansCost = createTeamDto.dedicated_fans * staffCosts.dedicated_fans_cost;
      // const assistantCoachesCost = createTeamDto.assistant_coaches * staffCosts.assistant_coach_cost;
      // const cheerleadersCost = createTeamDto.cheerleaders * staffCosts.cheerleader_cost;
      // const apothecaryCost = createTeamDto.has_apothecary ? staffCosts.apothecary_cost : 0;
    }

    async function getStaffCosts(rosterId: string, db: DatabaseService): Promise<number> {
      type Costs = {
        reroll_cost: number;
        dedicated_fans_cost: number;
        assistant_coach_cost: number;
        cheerleader_cost: number;
        apothecary_cost: number;
      };

      const costs: Costs = await db.roster.findFirst({
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

      const normalizedCosts: Costs = {
        reroll_cost: costs.reroll_cost ?? 0,
        dedicated_fans_cost: costs.dedicated_fans_cost ?? 0,
        assistant_coach_cost: costs.assistant_coach_cost ?? 0,
        cheerleader_cost: costs.cheerleader_cost ?? 0,
        apothecary_cost: costs.apothecary_cost ?? 0,
      };

      // Sum up all the costs
      return Object.values(normalizedCosts).reduce((total, cost) => total + (cost || 0), 0);
    }

    async function getPositionalCosts(rosterId: string, db: DatabaseService): Promise<number> {
      const costsList = await db.positionalRoster.findMany({
        select: { cost: true },
        where: { roster_id: rosterId }
      });

      if (!costsList) {
        throw new NotFoundException(`Could not find positional roster with roster ID: ${rosterId}`);
      }

      return costsList.reduce((tot, val) => tot + val.cost, 0);
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