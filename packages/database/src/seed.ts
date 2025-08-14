import { PrismaClient } from '@prisma/client';
import { Difficulty, TeamTier, SkillCategory } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

interface FUMMBLSkill {
  id: number;
  categoryId: number;
  category: string; // 'G', 'A', 'P', 'S', 'M'
  type: string;
  name: string;
  option: string;
  modifierType: null;
}

interface FUMMBLPosition {
  id: string;
  type: string; // 'NORMAL', 'BIGGUY', 'STAR'
  gender: string;
  title: string;
  quantity: number;
  iconLetter: string;
  cost: number;
  stats: {
    MA: number; // movement
    ST: number; // strength
    AG: number; // agility
    PA: number | null; // passing
    AV: number; // armour value
  };
  portrait: number;
  icon: number;
  skills: string[]; // starting skills
  normalSkills: string[]; // normal skill access
  doubleSkills: string[]; // double skill access
}

interface FUMMBLTeam {
  id: string;
  ownerRuleset: number;
  name: string;
  nameGenerator: string;
  rerollCost: number;
  apothecary: boolean;
  undead: boolean;
  necromancer: boolean;
  raisePosition: string | null;
  rookiePosition: number;
  maxBigGuys: number;
  info: string;
  stats: { physique: number; finesse: number; versatility: number };
  playable: boolean;
  keywords: string[];
  logos: Record<string, string>;
  pitch: string;
  specialRules: any[];
  stars: any[];
  positions: FUMMBLPosition[];
}

interface FUMMBLData {
  rosters?: FUMMBLTeam[]; // Your data uses "rosters"
  teams?: FUMMBLTeam[]; // Alternative naming
  skills: FUMMBLSkill[];
  ruleset?: any;
}

const prisma = new PrismaClient();

function mapSkillCategory(fummblCategory: string): SkillCategory {
  const categoryMap: Record<string, string> = {
    G: SkillCategory.GENERAL,
    A: SkillCategory.AGILITY,
    P: SkillCategory.PASSING,
    S: SkillCategory.STRENGTH,
    M: SkillCategory.MUTATION,
  };

  return (
    (categoryMap[fummblCategory] as SkillCategory) || SkillCategory.GENERAL
  );
}

function mapTeamTier(tier?: string): TeamTier {
  if (!tier) return TeamTier.TIER_1;

  switch (tier) {
    case '1':
      return TeamTier.TIER_1;
    case '2':
      return TeamTier.TIER_2;
    case '3':
      return TeamTier.TIER_3;
    default:
      return TeamTier.TIER_1;
  }
}

function mapDifficulty(info?: string): Difficulty {
  if (!info) return Difficulty.MEDIUM;

  const infoLower = info.toLowerCase();
  if (
    infoLower.includes('beginner') ||
    infoLower.includes('good for beginners')
  ) {
    return Difficulty.EASY;
  }

  if (infoLower.includes('advanced') || infoLower.includes('difficult')) {
    return Difficulty.HARD;
  }

  return Difficulty.MEDIUM;
}

async function seedSkills(skills: FUMMBLSkill[]) {
  console.log('🎯 Seeding skills...');

  for (const skill of skills) {
    try {
      await prisma.skill.upsert({
        where: { name: skill.name },
        update: {
          category: mapSkillCategory(skill.category),
        },
        create: {
          name: skill.name,
          description: `${skill.type} skill`,
          category: mapSkillCategory(skill.category),
          cost: 20000,
          isNormal: true,
        },
      });
    } catch (error) {
      console.error(`❌ Failed to seed skill: ${skill.name}`, error);
    }
  }

  console.log(`✅ Seeded ${skills.length} skills`);
}

async function seedTeams(teams: FUMMBLTeam[], rulesetData?: any) {
  console.log('🏈 Seeding teams...');

  for (const teamData of teams) {
    try {
      if (!teamData.playable || teamData.name.startsWith('_')) {
        console.log(`⏭️  Skipping non-playable team: ${teamData.name}`);
        continue;
      }

      let tier: TeamTier = TeamTier.TIER_1;
      if (rulesetData.rosters) {
        const rosterInfo = rulesetData.rosters.find(
          (r: any) => r.id === teamData.id,
        );
        if (rosterInfo.tier) {
          tier = mapTeamTier(rosterInfo.tier);
        }
      }

      const team = await prisma.team.upsert({
        where: { name: teamData.name.toLowerCase().replace(/\s+/g, '_') },
        update: {
          displayName: teamData.name,
          description: teamData.info,
          rerollCost: teamData.rerollCost,
          tier,
          difficulty: mapDifficulty(teamData.info),
          minPlayers: 11,
          maxPlayers: 16,
          edition: '2020',
        },
        create: {
          name: teamData.name.toLowerCase().replace(/\s+/g, '_'),
          displayName: teamData.name,
          description: teamData.info,
          rerollCost: teamData.rerollCost,
          tier,
          difficulty: mapDifficulty(teamData.info),
          minPlayers: 11,
          maxPlayers: 16,
          edition: '2020',
        },
      });

      await seedPositions(team.id, teamData.positions);

      console.log(`✅ Seeded team: ${teamData.name}`);
    } catch (error) {
      console.error(`❌ Failed to seed team: ${teamData.name}`, error);
    }
  }
}

async function seedPositions(teamId: string, positions: FUMMBLPosition[]) {
  for (const positionData of positions) {
    try {
      if (positionData.type === 'STAR') {
        console.log(`⏭️  Skipping star player: ${positionData.title}`);
        continue;
      }

      const startingSkills = await getSkillIds(positionData.skills || []);

      const position = await prisma.position.upsert({
        where: {
          teamId_name: { teamId, name: positionData.title },
        },
        update: {
          cost: positionData.cost,
          quantity: positionData.quantity,
          movement: positionData.stats.MA,
          strength: positionData.stats.ST,
          agility: positionData.stats.AG,
          armorValue: positionData.stats.AV,
          startingSkills: startingSkills,
        },
        create: {
          name: positionData.title,
          cost: positionData.cost,
          quantity: positionData.quantity,
          movement: positionData.stats.MA,
          strength: positionData.stats.ST,
          agility: positionData.stats.AG,
          armorValue: positionData.stats.AV,
          startingSkills: startingSkills,
          teamId: teamId,
        },
      });

      await seedSkillAccess(
        position.id,
        positionData.normalSkills || [],
        positionData.doubleSkills || [],
      );
    } catch (error) {
      console.error(`❌ Failed to seed position: ${positionData.title}`, error);
    }
  }
}

async function seedSkillAccess(
  positionId: string,
  normalSkills: string[],
  doubleSkills: string[],
) {
  await prisma.skillAccess.deleteMany({
    where: { positionId },
  });

  for (const category of normalSkills) {
    try {
      await prisma.skillAccess.create({
        data: {
          positionId,
          category: mapSkillCategory(category),
        },
      });
    } catch (error) {
      console.error(
        `❌ Failed to create normal skill access: ${category}`,
        error,
      );
    }
  }
}

async function getSkillIds(skillNames: string[]): Promise<string[]> {
  if (!skillNames.length) return [];

  const skills = await prisma.skill.findMany({
    where: {
      name: {
        in: skillNames,
      },
    },
    select: { id: true },
  });

  return skills.map((skill) => skill.id);
}

async function clearExistingData() {
  console.log('🧹 Clearing existing data...');

  // Delete in correct order to respect foreign keys
  await prisma.playerSkill.deleteMany();
  await prisma.skillAccess.deleteMany();
  await prisma.teamSkill.deleteMany();
  await prisma.player.deleteMany();
  await prisma.position.deleteMany();
  await prisma.roster.deleteMany();
  await prisma.team.deleteMany();
  await prisma.skill.deleteMany();

  console.log('✅ Existing data cleared');
}

async function main() {
  console.log('🌱 Starting database seed...');

  try {
    const fummblDataPath = path.join(__dirname, 'bb_data.json');

    if (!fs.existsSync(fummblDataPath)) {
      throw new Error(`FUMMBL data file not found at: ${fummblDataPath}.`);
    }

    const rawData = fs.readFileSync(fummblDataPath, 'utf-8');
    const fummblData: FUMMBLData = JSON.parse(rawData);

    const teams = fummblData.rosters || fummblData.teams;

    if (!teams || !Array.isArray(teams)) {
      throw new Error('Invalid FUMMBL data: missing skills array.');
    }

    console.log(
      `📊 Found ${teams.length} teams and ${fummblData.skills.length} skills`,
    );

    await clearExistingData();

    await seedSkills(fummblData.skills);
    await seedTeams(teams, fummblData.ruleset);

    console.log('🎉 Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    throw error;
  }
}

async function debugSeedData() {
  console.log('🔍 Debugging seed data...');

  const teamCount = await prisma.team.count();
  const positionCount = await prisma.position.count();
  const skillCount = await prisma.skill.count();

  console.log(`Teams: ${teamCount}`);
  console.log(`Positions: ${positionCount}`);
  console.log(`Skills: ${skillCount}`);

  // Show sample data
  const sampleTeam = await prisma.team.findFirst({
    include: {
      positions: {
        include: {
          skillAccess: true,
        },
      },
    },
  });

  if (sampleTeam) {
    console.log('Sample team:', {
      name: sampleTeam.displayName,
      positions: sampleTeam.positions.length,
      firstPosition: sampleTeam.positions[0]?.name,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Debug info
    await debugSeedData();
    await prisma.$disconnect();
  });
