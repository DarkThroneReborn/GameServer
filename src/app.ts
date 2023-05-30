import express, { Express } from 'express';
import bodyParser from 'body-parser';

import { Config } from '../config/environment';
import router from './router';
import corsMiddleware from './middleware/cors';
import { ulid } from 'ulid';
import DaoFactory from './daoFactory';
import ModelFactory from './modelFactory';
import UserModel from './models/user';

export interface Context {
  requestId: string;
  config: Config;
  daoFactory: DaoFactory;
  modelFactory: ModelFactory;
  user?: UserModel;
}

export default (config: Config, daoFactory: DaoFactory): Express => {
  const app = express();

  app.use(bodyParser.json());

  app.use((req, res, next) => {
    const requestId = ulid();

    req.ctx = {
      requestId: requestId,
      config: config,
      daoFactory: daoFactory,
      modelFactory: new ModelFactory(),
    };

    res.setHeader('X-Request-Id', requestId);
    res.setHeader(
      'X-Powered-By',
      `Dark Throne Reborn Game Server ${config.version}`
    );

    next();
  });

  app.use(async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return next();

    const [type, token] = authorization.split(' ');

    if (type !== 'Bearer') return next();

    const user = await req.ctx.modelFactory.user.fetchByToken(req.ctx, token);
    if (!user) return next();

    req.ctx.user = user;
    next();
  });

  if (config.allowedOrigins?.length > 0) {
    app.use(corsMiddleware(config.allowedOrigins));
  }

  app.use(router);

  return app;
};
