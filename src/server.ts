import express, { Application, Request, Response } from 'express';
import config from '../config/config';
import pkg from '../package.json';

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ version: pkg.version });
});

app.listen(config.serverPort, () => {
  console.log('Server is running...');
});