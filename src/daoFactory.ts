import { Knex } from 'knex';
import UserDao from './daos/user';

export default class DaoFactory {
  private database: Knex;

  public user: UserDao;

  constructor(database: Knex) {
    this.database = database;

    this.user = new UserDao(this.database);
  }

  async testConnection() {
    try {
      const result: any = await this.database.raw('SELECT 1+1 AS result');
      return result.rows[0].result === 2 ? true : false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}