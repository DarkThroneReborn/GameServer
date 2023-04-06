import { Knex } from "knex";
import { onUpdateTrigger } from '../knexfile';


export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('external_id').notNullable();
      table.string('username').notNullable();
      table.string('password_hash').notNullable();
      table.string('email').notNullable();
      table.timestamps(true, true);
    })
    .then(() => {
      return knex.raw(onUpdateTrigger('users'));
    });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}

