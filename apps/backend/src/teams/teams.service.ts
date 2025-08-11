import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { DatabaseService } from 'src/database/database.service';
import { Team } from '@bb-companion/database';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class TeamsService {
  constructor(private readonly databaseService: DatabaseService) {}

async create(createTeamDto: CreateTeamDto, coachUsername: string) {
    const coachId = await this.databaseService.coach.findUnique({
      where: { username: coachUsername },
      select: { id: true }
    })
    if (!coachId) {
      throw new NotFoundException("Coach not found. Could not create Team.")
    }

    const rosterId = await this.databaseService.roster.findUnique({
      where: { slug: createTeamDto.roster_slug},
      select: { id: true }
    })
    if (!rosterId) {
      throw new NotFoundException("Roster not found. Could not create Team.")
    }

    if (createTeamDto.name.trim().length === 0){
      throw new BadRequestException("No team name was given.")
    }

    return await this.databaseService.team.create({
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

      const staffCosts = await getStaffCosts(rosterId, this.databaseService)
      const playerCosts = await getPositionalCosts(rosterId, this.databaseService)

      // TODO: Get TV from Ruleset (unimplemented)
      // Checking Staff and Player costs vs allowed TV
      return 1_000_000 - staffCosts - playerCosts
      
      // const rerollCost = createTeamDto.rerolls * staffCosts.reroll_cost;
      // const dedicatedFansCost = createTeamDto.dedicated_fans * staffCosts.dedicated_fans_cost;
      // const assistantCoachesCost = createTeamDto.assistant_coaches * staffCosts.assistant_coach_cost;
      // const cheerleadersCost = createTeamDto.cheerleaders * staffCosts.cheerleader_cost;
      // const apothecaryCost = createTeamDto.has_apothecary ? staffCosts.apothecary_cost : 0;
    }

    async function getStaffCosts(rosterId: string, databaseService: DatabaseService): Promise<number> {
      type Costs = {
        reroll_cost: number;
        dedicated_fans_cost: number;
        assistant_coach_cost: number;
        cheerleader_cost: number;
        apothecary_cost: number;
      };

      const costs: Costs = await this.databaseService.roster.findFirst({
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

    async function getPositionalCosts(rosterId: string, databaseService: DatabaseService): Promise<number> {
      const costsList = await this.databaseService.positionalRoster.findMany({
        select: { cost: true },
        where: { roster_id: rosterId }
      });

      if (!costsList) {
        throw new NotFoundException(`Could not find positional roster with roster ID: ${rosterId}`);
      }

      return costsList.reduce((tot: number, val: any) => tot + val.cost, 0);
    }
  }

  async findAllByCoach(coachUsername: string): Promise<Team[]> {
    return this.databaseService.team.findMany({
      where: {
        coach: {
          username: coachUsername,
        },
      },
    });
  }

  async findOne(teamId: string, coachUsername: string): Promise<Team | null> {
    const team = await this.databaseService.team.findUnique({
      where: {
        id: teamId,
        coach: {
          username: coachUsername,
        },
      },
    });

    if (!team) {
      throw new NotFoundException(
        `Team with ID "${teamId}" not found or not accessible.`,
      );
    }

    return team;
  }


  async update(
    teamId: string,
    updateTeamDto: UpdateTeamDto,
    coachUsername: string,
  ): Promise<Team> {
    try {
      return await this.databaseService.team.update({
        data: updateTeamDto,
        where: {
          id: teamId,
          coach: {
            username: coachUsername,
          },
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(
          `Team with ID ${teamId} not found or not accessible.`,
        );
      }
      throw error;
    }
  }

  async remove(teamId: string, coachUsername: string): Promise<Team> {
    try {
      return await this.databaseService.team.delete({
        where: {
          id: teamId,
          coach: {
            username: coachUsername,
          },
        },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException(
          `Team with ID ${teamId} not found or not accessible.`,
        );
      }
      throw error;
    }
  }
}
