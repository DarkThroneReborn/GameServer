import { Request, Response } from 'express';

export type APIUserRecord = {
  id: string;
  username: string;
  population: number;
  military: {
    armySize: number;
  };
  economy: {
    gold: number;
  };
};

export async function fetchUserByExternalId(req: Request, res: Response) {
  const externalId = req.params.externalId;
  const user = await req.ctx.modelFactory.user.fetchUserByExternalId(
    req.ctx,
    externalId
  );
  if (!user) return res.status(404).json({});

  const userRecord: APIUserRecord = {
    id: user.externalId,
    username: user.username,
    population: user.population,
    military: {
      armySize: user.armySize,
    },
    economy: {
      gold: user.gold,
    },
  };

  return res.status(200).json(userRecord);
}
