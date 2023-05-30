import { Request, Response } from 'express';

export default {
  async getCurrentUser(req: Request, res: Response) {
    // This is a protected route, so we can assume that the user is authenticated.
    if (!req.ctx.user) return;

    res.status(200).json({
      id: req.ctx.user.id,
    });
  },
};
