import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('users', (table) => {
    table.bigint('gold').defaultTo(0);
    table.json('units').defaultTo('[]');
    table.bigint('offensive_strength').defaultTo(0);
    table.bigint('defensive_strength').defaultTo(0);
    table.integer('gold_per_turn').defaultTo(0);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('users', (table) => {
    table.dropColumn('gold');
    table.dropColumn('units');
    table.dropColumn('offensive_strength');
    table.dropColumn('defensive_strength');
    table.dropColumn('gold_per_turn');
  });
}

