import { Prisma, PrismaClient } from '@prisma/client';

import { ProcessedRaceRoster } from 'types';
import BB_DATA from './race_rosters_with_skills.json';

const prisma = new PrismaClient();

async function main() {
  const seedData = BB_DATA as ProcessedRaceRoster[];

  console.log('Cleaning up existing data...');
  void (await prisma.position.deleteMany());
  void (await prisma.race.deleteMany());
  void (await prisma.skill.deleteMany());
  console.log('Existing data cleaned.');

  const allUniqueSkillNames = new Set<string>();
  void seedData.forEach((race) => {
    race.positions.forEach((position) => {
      position.startingSkills.forEach((skill) => {
        allUniqueSkillNames.add(skill.skillName);
      });
    });
  });

  const skillsToCreate: Prisma.SkillCreateInput[] = Array.from(
    allUniqueSkillNames,
  ).map((skillName) => {
    return {
      name: skillName,
      slug: skillName
        .toLowerCase()
        .replace(/\s/g, '_')
        .replace(/[^a-z0-9-]/g, ''),
      category: 'General',
    };
  });

  console.log(`Seeding ${skillsToCreate.length} unique skills...`);
  void (await prisma.skill.createMany({
    data: skillsToCreate,
    skipDuplicates: true,
  }));
  console.log('Skills saved successfully.');

  console.log(`Seeding ${seedData.length} races with their positions...`);
  for (const raceData of seedData) {
    console.log(`Creating race: ${raceData.raceName}...`);
    void (await prisma.race.create({
      data: {
        name: raceData.raceName,
        slug: raceData.slug,
        description: raceData.description,
        rerollCost: raceData.rerollCost,
        apothecaryAllowed: raceData.hasApothecary,
        pros: [],
        cons: [],
        position: {
          create: raceData.positions.map((position) => ({
            name: position.positionName,
            cost: position.cost,
            movement: position.MA,
            strength: position.ST,
            agility: position.AG,
            passing: position.PA,
            armorValue: position.AV,
            maxPerTeam: position.quantity,
            startingSkills:
              position.startingSkills as unknown as Prisma.JsonArray,
          })),
        },
      },
    }));
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
