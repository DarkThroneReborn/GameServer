import { Request, Response } from 'express';

export type APIUserRecord = {
  id: string;
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
  };

  return res.status(200).json(userRecord);
}
