import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const bbSkills: Prisma.SkillCreateInput[] = [
    {
      name: 'Arm bar',
      category: 'strength',
      slug: 'arm-bar',
      internalNotes: "you're not supposed to see this.",
    },
    {
      name: 'Brawler',
      category: 'strength',
      slug: 'brawler',
      internalNotes: "you're not supposed to see this.",
    },
    {
      name: 'Tackle',
      category: 'strength',
      slug: 'tackle',
      internalNotes: "you're not supposed to see this.",
    },
    {
      name: 'Grab',
      category: 'strength',
      slug: 'grab',
      internalNotes: "you're not supposed to see this.",
    },
    {
      name: 'Guard',
      category: 'strength',
      slug: 'guard',
      internalNotes: "you're not supposed to see this.",
    },
    {
      name: 'Juggernaut',
      category: 'strength',
      slug: 'juggernaut',
      internalNotes: "you're not supposed to see this.",
    },
    {
      name: 'Mighty Blow',
      category: 'strength',
      slug: 'mighty-blow',
      internalNotes: "you're not supposed to see this.",
    },
    {
      name: 'Block',
      category: 'general',
      slug: 'block',
      internalNotes: "you're not supposed to see this.",
    },
    {
      name: 'Pile driver',
      category: 'general',
      slug: 'pile-driver',
      internalNotes: "you're not supposed to see this.",
    },
    {
      name: 'Stand firm',
      category: 'general',
      slug: 'stand-firm',
      internalNotes: "you're not supposed to see this.",
    },
    {
      name: 'Extra Arms',
      category: 'general',
      slug: 'extra-arms',
      internalNotes: "you're not supposed to see this.",
    },
    {
      name: 'Thick skull',
      category: 'general',
      slug: 'thick-skull',
      internalNotes: "you're not supposed to see this.",
    },
  ];

  const racesWithPositions: Prisma.RaceCreateInput[] = [
    {
      id: 'f0fa6d67-18d7-44aa-af5b-1ab93cefd481',
      name: 'Vampire',
      slug: 'vampire',
      description: 'They lust for blood.',
      apothecaryAllowed: false,
      pros: ['Strong'],
      cons: ['Can become stupid'],
      rerollCost: 0,
      position: {
        create: [
          {
            name: 'Blocker',
            cost: 150,
            movement: 7,
            strength: 4,
            agility: 3,
            passing: 3,
            armorValue: 8,
            maxPerTeam: 6,
            startingSkills: [],
          },
          {
            name: 'Catcher',
            cost: 30,
            movement: 5,
            strength: 2,
            agility: 3,
            passing: 4,
            armorValue: 7,
            maxPerTeam: 4,
            startingSkills: [],
          },
        ],
      },
    },
    {
      id: 'fe98c909-5ad6-4456-9e89-125ac1454b96',
      name: 'Black Orc',
      slug: 'black-orc',
      description: 'Strong and low IQ.',
      apothecaryAllowed: true,
      pros: ['High Strength'],
      cons: ['Low Movement Allowance', 'Can become stupid'],
      rerollCost: 2,
      position: {
        create: [
          {
            name: 'Black Orc',
            cost: 90,
            movement: 4,
            strength: 4,
            agility: 4,
            passing: 5,
            armorValue: 10,
            maxPerTeam: 6,
            startingSkills: ['Brawler', 'Grab'],
          },
          {
            name: 'Trained Troll',
            cost: 115,
            movement: 4,
            strength: 5,
            agility: 5,
            passing: 5,
            armorValue: 10,
            maxPerTeam: 1,
            startingSkills: [
              'Always Hungry',
              'Loner (3+)',
              'Mighty Blow (+1)',
              'Projectile Vomit',
              'Really Stupid',
              'Regeneration',
              'Throw Team-mate',
            ],
          },
          {
            name: 'Goblin Bruiser Lineman',
            cost: 45,
            movement: 6,
            strength: 2,
            agility: 3,
            passing: 4,
            armorValue: 8,
            maxPerTeam: 12,
            startingSkills: ['Dodge', 'Stunty', 'Right Stuff', 'Thick Skull'],
          },
          {
            name: 'Thrower',
            cost: 70,
            movement: 6,
            strength: 3,
            agility: 3,
            passing: 2,
            armorValue: 8,
            maxPerTeam: 2,
            startingSkills: ['Pass'],
          },
          {
            name: 'Lineman',
            cost: 50,
            movement: 5,
            strength: 3,
            agility: 3,
            passing: 4,
            armorValue: 9,
            maxPerTeam: 16,
            startingSkills: [],
          },
        ],
      },
    },
    {
      id: '2fc6a305-cc2d-430e-86ae-fc0479061b28',
      name: 'Skaven',
      slug: 'skaven',
      description: 'High manouverability and hard to catch.',
      apothecaryAllowed: true,
      pros: [
        'High Manouverability',
        'Have access to Dodge and Block from base',
      ],
      cons: ['Low Strength'],
      rerollCost: 2,
      position: {
        create: [
          {
            name: 'Skaven Clanrat Lineman',
            cost: 50,
            movement: 7,
            strength: 3,
            agility: 3,
            passing: 4,
            armorValue: 8,
            maxPerTeam: 16,
            startingSkills: [],
          },
          {
            name: 'Gutter Runner',
            cost: 85,
            movement: 9,
            strength: 2,
            agility: 2,
            passing: 4,
            armorValue: 8,
            maxPerTeam: 4,
            startingSkills: ['Dodge'],
          },
          {
            name: 'Thrower',
            cost: 85,
            movement: 7,
            strength: 3,
            agility: 3,
            passing: 2,
            armorValue: 8,
            maxPerTeam: 2,
            startingSkills: ['Pass', 'Sure Hands'],
          },
          {
            name: 'Blitzer',
            cost: 90,
            movement: 7,
            strength: 3,
            agility: 3,
            passing: 5,
            armorValue: 9,
            maxPerTeam: 2,
            startingSkills: ['Block'],
          },
          {
            name: 'Rat Ogre',
            cost: 150,
            movement: 6,
            strength: 5,
            agility: 4,
            passing: null,
            armorValue: 9,
            maxPerTeam: 2,
            startingSkills: ['Block'],
          },
        ],
      },
    },
  ];

  const skillCreation = bbSkills.map((skillData) => {
    console.log(`Creating skill: ${skillData.name}...`);
    return prisma.skill.create({
      data: skillData,
    });
  });

  const raceCreation = racesWithPositions.map((raceData) => {
    console.log(`Creating race: ${raceData.name} with positions...`);
    return prisma.race.create({
      data: raceData,
    });
  });

  const allPromises = [...skillCreation, ...raceCreation];

  await Promise.all(allPromises);
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
