import Knex from 'knex';
import { Model } from 'objection';
import AdminUser from '../models/AdminUser';
import logger from '../config/winston';

const { DB_NAME, DB_PASSWORD, DB_USER, DB_SOCKET_NAME } = process.env;

interface Config {
  client: string;
  connection: {
    database: string | undefined;
    user: string | undefined;
    password: string | undefined;
    host?: string | undefined;
  };
}

// Decide which Knex config to use based on NODE_ENV
let config: Config = {
  client: 'pg',
  connection: {
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
  },
};

if (process.env.NODE_ENV === 'production')
  config = {
    client: 'pg',
    connection: {
      database: DB_NAME,
      user: DB_USER,
      password: DB_PASSWORD,
      host: `/cloudsql/${DB_SOCKET_NAME}`,
    },
  };

// Initialize Knex and Objection
export default async () => {
  const knex = Knex(config);

  Model.knex(knex);

  // Test if DB works by a simple request
  (async () => {
    try {
      await AdminUser.query();
      logger.info('Postgres Server Connected');
    } catch (e) {
      logger.info('Postgres: ' + e.message);
    }
  })();
};
