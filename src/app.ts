import express, { Express } from 'express';
import { Config } from '../config/config';
import router from './router';
import corsMiddleware from './middleware/cors';
import { ulid } from 'ulid';

export interface Context {
  requestId: string;
  config: Config;
}

export default (config: Config): Express => {
  const app = express();

  app.use((req, res, next) => {
    const requestId = ulid();

    req.ctx = {
      requestId: requestId,
      config: config,
    }

    res.setHeader('X-Request-Id', requestId);
    res.setHeader('X-Powered-By', `Dark Throne Reborn Game Server ${config.version}`);

    next();
  });


  app.use(corsMiddleware(config.allowedOrigins));

  app.use(router);

  return app;
}
