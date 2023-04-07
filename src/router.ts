import { Router, Request, Response } from 'express';
import { healthcheck } from './controllers/healthcheck';
import { fetchUserByExternalId } from './controllers/user';

const router = Router();

router.get('/healthcheck', healthcheck);

router.get('/user/:externalId', fetchUserByExternalId);

export default router;