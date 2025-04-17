import * as dotenv from "dotenv";

const env = process.env.NODE_ENV || "development";
if (env === "test") {
  // 테스트 환경에서는 개발환경변수를 확장해서 사용
  dotenv.config({ path: ".env.development" });
}

dotenv.config({ path: `.env.${env}` });

function getEnvVariable(key: string, required?: true): string;
function getEnvVariable(key: string, required?: false): string | undefined;
function getEnvVariable(key: string, required = true): string | undefined {
  const value = process.env[key];
  if (required && value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }

  return value;
}

export const Config = {
  SERVICE_NAME: getEnvVariable("SERVICE_NAME"),
  PORT: getEnvVariable("PORT"),
  APPLICATION_LOG_DIR: getEnvVariable("APPLICATION_LOG_DIR", false),
  TYPEORM_CONNECTION: getEnvVariable("TYPEORM_CONNECTION"),
  TYPEORM_HOST: getEnvVariable("TYPEORM_HOST"),
  TYPEORM_USERNAME: getEnvVariable("TYPEORM_USERNAME"),
  TYPEORM_PASSWORD: getEnvVariable("TYPEORM_PASSWORD"),
  TYPEORM_DATABASE: getEnvVariable("TYPEORM_DATABASE"),
  TYPEORM_SCHEMA: getEnvVariable("TYPEORM_SCHEMA"),
  TYPEORM_PORT: getEnvVariable("TYPEORM_PORT"),
  TYPEORM_SYNCHRONIZE: getEnvVariable("TYPEORM_SYNCHRONIZE"),
  TYPEORM_LOGGING: getEnvVariable("TYPEORM_LOGGING"),
  TYPEORM_ENTITIES: getEnvVariable("TYPEORM_ENTITIES"),
  GOOGLE_CLIENT_ID: getEnvVariable("GOOGLE_CLIENT_ID"),
  GOOGLE_CLIENT_SECRET: getEnvVariable("GOOGLE_CLIENT_SECRET"),
  GOOGLE_CALLBACK_URL: getEnvVariable("GOOGLE_CALLBACK_URL"),
  JWT_SECRET: getEnvVariable("JWT_SECRET"),
  SESSION_SECRET: getEnvVariable("SESSION_SECRET"),
  FRONTEND_URL: getEnvVariable("FRONTEND_URL"),
};
