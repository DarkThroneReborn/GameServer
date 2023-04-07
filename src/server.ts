import config from '../config/config';
import App from './app';
import Knex from 'knex';
import knexConfig from '../knexfile';
import DaoFactory from './daoFactory';
import ModelFactory from './modelFactory';

const knex = Knex(knexConfig[config.environment]);
const daoFactory = new DaoFactory(knex);
const modelFactory = new ModelFactory();

const app = App(config, daoFactory, modelFactory);

app.listen(config.serverPort, () => {
  console.log('Server started');
});