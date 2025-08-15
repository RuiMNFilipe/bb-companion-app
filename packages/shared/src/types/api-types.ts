import { Prisma } from '@bb-companion/database';

export type TeamWithPositions = Prisma.TeamGetPayload<{
  include: {
    positions: {
      select: {
        name: true;
        cost: true;
        quantity: true;
      };
    };
  };
}>;
