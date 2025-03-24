/* eslint-disable @typescript-eslint/no-explicit-any */
// logger.ts
import type { Logger as WinstonLogger, LoggerOptions } from "winston";
import winston from "winston";
import "winston-daily-rotate-file";
import type { TransportConfig } from "./transports";
import { getTransportInstances } from "./transports";

// 전체 로거 설정 인터페이스
export interface LoggerConfig {
  level?: string;
  transports?: TransportConfig[];
}

// 커스텀 포맷: message 필드가 빈 문자열이나 undefined이면 제거
const removeEmptyMessage = winston.format((info) => {
  if (info.message === "" || info.message === undefined) {
    delete info.message;
  }

  return info;
});

class Logger {
  private logger: WinstonLogger;

  constructor(config: LoggerConfig = {}) {
    const transports = getTransportInstances(config.transports);
    const loggerOptions: LoggerOptions = {
      level: config.level || "info",
      format: winston.format.combine(
        winston.format.timestamp(), // 로그 시각 추가
        removeEmptyMessage(),
        winston.format.json() // 로그를 JSON 형태로 출력
      ),
      transports,
    };

    this.logger = winston.createLogger(loggerOptions);
  }

  // 기본 log 메서드
  log(level: string, message: string, meta?: any) {
    this.logger.log(level, message, meta);
  }

  // 레벨별 편의 메서드들
  info(log: any) {
    let _log = log;
    if (typeof log === "string") {
      _log = { message: log };
    }
    this.logger.info("", _log);
  }

  warn(log: any) {
    let _log = log;
    if (typeof log === "string") {
      _log = { message: log };
    }
    this.logger.warn("", _log);
  }

  error(log: any) {
    let _log = log;
    if (typeof log === "string") {
      _log = { message: log };
    }
    this.logger.error("", _log);
  }
}

export default Logger;
