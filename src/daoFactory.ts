import { Knex } from 'knex';

export default class DaoFactory {
  private database: Knex;

  constructor(database: Knex) {
    this.database = database;
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