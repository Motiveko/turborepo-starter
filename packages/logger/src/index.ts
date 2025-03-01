// logger.ts
import winston, {
  format,
  transports,
  Logger as WinstonLogger,
  LoggerOptions,
} from "winston";

// 각 전송(transport) 설정을 위한 인터페이스
interface TransportConfig {
  type: "console" | "file" | "http";
  options?: any; // 각 전송에 따른 winston transport 옵션
}

// 전체 로거 설정 인터페이스
interface LoggerConfig {
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

  constructor(config?: LoggerConfig) {
    const loggerOptions: LoggerOptions = {
      level: config?.level || "info",
      format: winston.format.combine(
        winston.format.timestamp(), // 로그 시각 추가
        removeEmptyMessage(),
        winston.format.json() // 로그를 JSON 형태로 출력
      ),
      transports: [
        new winston.transports.Console(), // 콘솔 출력
      ],
    };

    this.logger = winston.createLogger(loggerOptions);
  }

  // 기본 log 메서드
  log(level: string, message: string, meta?: any) {
    this.logger.log(level, message, meta);
  }

  // 레벨별 편의 메서드들
  info(meta: any) {
    this.logger.info("", meta);
  }

  warn(meta: any) {
    this.logger.info("", meta);
  }

  error(meta: any) {
    this.logger.info("", meta);
  }
}

export default Logger;
