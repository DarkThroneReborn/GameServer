import type { Knex } from 'knex';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: process.env.GAME_SERVER_DATABASE_URL,
    migrations: {
      extension: 'ts',
      tableName: 'knex_migrations',
    },
  },

  staging: {
    client: 'pg',
    connection: process.env.GAME_SERVER_STAGING_DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      extension: 'js',
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.GAME_SERVER_PRODUCTION_DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      extension: 'js',
      tableName: 'knex_migrations',
    },
  },
};

export function onUpdateTrigger(table: string): string {
  return `CREATE TRIGGER ${table}_updated_at
BEFORE UPDATE ON ${table}
FOR EACH ROW
EXECUTE PROCEDURE on_update_timestamp();
`;
}

export default config;
