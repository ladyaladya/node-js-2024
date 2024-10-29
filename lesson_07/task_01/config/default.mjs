import dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

export default Object.freeze({
  databaseName: process.env.DATABASE_NAME,
  databaseUrl: process.env.DATABASE_URL,
  databaseFullName: `${process.env.DATABASE_URL}${process.env.DATABASE_NAME}`,
  port: process.env.PORT,
});