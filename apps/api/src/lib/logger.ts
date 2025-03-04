import { Config } from "@api/config/env";
import Logger, { LoggerConfig } from "@repo/logger";

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

const _logger = new Logger({ transports: transports });

const logger = {
  info: _logger.info.bind(_logger),
  warn: _logger.info.bind(_logger),
  error: _logger.info.bind(_logger),
  log(...args: Parameters<typeof console.log>) {
    console.log(...args);
  },
};

export default logger;
