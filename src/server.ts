import config from '../config/environment';
import App from './app';
import Knex from 'knex';
import knexConfig from '../knexfile';
import DaoFactory from './daoFactory';
import ModelFactory from './modelFactory';

const knex = Knex(knexConfig[config.environment]);
const daoFactory = new DaoFactory(knex);

const app = App(config, daoFactory);

app.listen(config.serverPort, () => {
  console.log('Server started');
});
