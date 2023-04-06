import config from '../config/config';
import App from './app';
import Knex from 'knex';
import knexConfig from '../knexfile';
import DaoFactory from './daoFactory';

const knex = Knex(knexConfig[config.environment]);
const daoFactory = new DaoFactory(knex);

const app = App(config, daoFactory);

app.listen(config.serverPort, () => {
  console.log('Server started');
});