import { Request, Response } from 'express';

export function healthcheck(req: Request, res: Response) {
  res.status(200).json({ status: 'OK', version: req.ctx.config.version });
}