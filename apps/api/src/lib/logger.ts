import Logger from "@repo/logger";

const _logger = new Logger();

const logger = {
  info: _logger.info.bind(_logger),
  warn: _logger.info.bind(_logger),
  error: _logger.info.bind(_logger),
  log(...args: Parameters<typeof console.log>) {
    console.log(...args);
  },
};

export default logger;
