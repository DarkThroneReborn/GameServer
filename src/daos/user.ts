import { Knex } from 'knex';
import { ulid } from 'ulid';

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

  async fetchUserByEmail(email: string): Promise<UserRow | null> {
    const user = await this.database<UserRow>('users')
      .select()
      .where({ email })
      .first();

    return user || null;
  }

  async fetchUserByUsername(username: string): Promise<UserRow | null> {
    const user = await this.database<UserRow>('users')
      .select()
      .where({ username })
      .first();

    return user || null;
  }

  async createUser(
    username: string,
    passwordHash: string,
    email: string
  ): Promise<UserRow> {
    const user = await this.database<UserRow>('users')
      .insert({
        external_id: ulid(),
        username,
        password_hash: passwordHash,
        email,
      })
      .returning('*');

    return user[0];
  }
}
