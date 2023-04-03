import { Router, Request, Response } from 'express';
import { healthcheck } from './controllers/healthcheck';

const router = Router();

router.get('/healthcheck', healthcheck);

export default router;