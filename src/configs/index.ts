import * as dotenv from 'dotenv';
dotenv.config();

const {
  PORT,
  NODE_ENV,
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
  PG_DATABASE_TEST,
  PG_USER,
  PG_PASSWORD,
  TOKEN_SECRET,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
} = process.env;

export default {
  PORT,
  NODE_ENV,
  PG_HOST,
  PG_PORT,
  PG_DATABASE,
  PG_DATABASE_TEST,
  PG_USER,
  PG_PASSWORD,
  TOKEN_SECRET,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
};
