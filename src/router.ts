import { Router, Request } from 'express';
import { healthcheck } from './controllers/healthcheck';
import { fetchUserByExternalId } from './controllers/user';

import AuthController from './controllers/auth';
import errors, { prepareErrorResponse } from './errors';

const router = Router();

router.get('/healthcheck', healthcheck);

router.get('/user/:externalId', fetchUserByExternalId);

router.post('/auth/login', AuthController.login);

const authenticatedRouter = Router();
authenticatedRouter.use((req: Request, res, next) => {
  if (!req.ctx.user) {
    const errorResponse = prepareErrorResponse([errors.A1002]);
    res.status(errorResponse.httpStatus).json(errorResponse.body);
    return;
  }

  next();
});

authenticatedRouter.get('/auth/currentUser', AuthController.getCurrentUser);

router.use(authenticatedRouter);

export default router;
