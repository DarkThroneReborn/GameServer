import { Knex } from 'knex';

export type UserRow = {
  id: number;
  external_id: string;
  username: string;
  password_hash: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  gold: number;
  units: string;
  offensive_strength: number;
  defensive_strength: number;
  gold_per_turn: number;
};

export default class UserDao {
  private database: Knex;

  constructor(database: Knex) {
    this.database = database;
  }

  async fetchUserByExternalId(externalId: string): Promise<UserRow | null> {
    const user = await this.database<UserRow>('users')
      .select()
      .where({ external_id: externalId })
      .first();

    return user || null;
  }
}