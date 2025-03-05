import * as dotenv from "dotenv";

const env = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${env}` });

export const Config = {
  SLACK_WEBHOOK_URL: process.env.SLACK_WEBHOOK_URL as string,
  APPLICATION_LOG_DIR: process.env.APPLICATION_LOG_DIR,
};
