import * as dotenv from "dotenv";

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

export const Config = {
  PORT: process.env.PORT,
  TYPEORM_CONNECTION: process.env.TYPEORM_CONNECTION,
  TYPEORM_HOST: process.env.TYPEORM_HOST,
  TYPEORM_USERNAME: process.env.TYPEORM_USERNAME,
  TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD,
  TYPEORM_DATABASE: process.env.TYPEORM_DATABASE,
  TYPEORM_SCHEMA: process.env.TYPEORM_SCHEMA,
  TYPEORM_PORT: process.env.TYPEORM_PORT,
  TYPEORM_SYNCHRONIZE: process.env.TYPEORM_SYNCHRONIZE,
  TYPEORM_LOGGING: process.env.TYPEORM_LOGGING,
  TYPEORM_ENTITIES: process.env.TYPEORM_ENTITIES,
};
