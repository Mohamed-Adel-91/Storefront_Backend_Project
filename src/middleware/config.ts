import dotenv from "dotenv";

dotenv.config();

const {
  port,
  NODE_ENV,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DATABASE,
  POSTGRES_DATABASE_TEST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  BCRYPT_PASSWORD,
  SALT_ROUNDS,
} = process.env;

export default {
  port: port,
  host: POSTGRES_HOST,
  dbport: POSTGRES_PORT,
  database: NODE_ENV === "dev" ? POSTGRES_DATABASE : POSTGRES_DATABASE_TEST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  pepper: BCRYPT_PASSWORD,
  salt: SALT_ROUNDS,
};
