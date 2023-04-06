import { Request, Response } from 'express';

export async function healthcheck(req: Request, res: Response) {
  const isDatabaseConnected = await req.ctx.daoFactory.testConnection();

  const overallStatus = isDatabaseConnected ? 'OK' : 'ERROR';
  res.status(200).json({ version: req.ctx.config.version, status: overallStatus, checks: { database: isDatabaseConnected ? 'OK' : 'ERROR' } });
}