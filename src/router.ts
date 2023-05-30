import { Router, Request } from 'express';
import { healthcheck } from './controllers/healthcheck';
import { fetchUserByExternalId } from './controllers/user';

import AuthController from './controllers/auth';

const router = Router();

router.get('/healthcheck', healthcheck);

router.get('/user/:externalId', fetchUserByExternalId);

const authenticatedRouter = Router();
authenticatedRouter.use((req: Request, res, next) => {
  if (!req.ctx.user) {
    res.status(401).json({
      errors: [
        {
          title: 'Unauthorized',
          detail: 'Your request is not authorized to access this resource.',
        },
      ],
    });
    return;
  }

  next();
});

authenticatedRouter.get('/auth/currentUser', AuthController.getCurrentUser);

router.use(authenticatedRouter);

export default router;
