import Logger, { LoggerConfig } from "@repo/logger";
import { Config } from "@scheduler/config/env";

const transports: LoggerConfig["transports"] = [{ type: "console" }];
if (Config.APPLICATION_LOG_DIR) {
  // 저장할 경로가 있는경우만
  transports.push({
    type: "file-rotate",
    options: {
      filename: `${Config.APPLICATION_LOG_DIR}/application-${Config.SERVICE_NAME}-%DATE%.log`,
      datePattern: "YYYY-MM-DD",
      level: "info",
      zippedArchive: true,
    },
  });
}

export const logger = new Logger({ transports: transports });
