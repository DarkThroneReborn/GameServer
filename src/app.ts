import express, { Express } from 'express';
import { Config } from '../config/config';
import router from './router';
import corsMiddleware from './middleware/cors';
import { ulid } from 'ulid';
import DaoFactory from './daoFactory';
import ModelFactory from './modelFactory';

export interface Context {
  requestId: string;
  config: Config;
  daoFactory: DaoFactory;
  modelFactory: ModelFactory;
}

export default (config: Config, daoFactory: DaoFactory, modelFactory: ModelFactory): Express => {
  const app = express();

  app.use((req, res, next) => {
    const requestId = ulid();

    req.ctx = {
      requestId: requestId,
      config: config,
      daoFactory: daoFactory,
      modelFactory: modelFactory
    }

    res.setHeader('X-Request-Id', requestId);
    res.setHeader('X-Powered-By', `Dark Throne Reborn Game Server ${config.version}`);

    next();
  });


  app.use(corsMiddleware(config.allowedOrigins));

  app.use(router);

  return app;
}
