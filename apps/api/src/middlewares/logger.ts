import logger from "@api/lib/logger";
import { startTimer } from "@api/lib/timer";
import { RequestHandler } from "express";

export const loggerMiddleware: RequestHandler = (req, res, next) => {
  const startTime = Date.now();
  const getExecutionTime = startTimer();
  // 응답이 완료되었을 때 로그를 출력
  res.on("error", (args) => {
    //
    logger.log('res.on("error")...');
    console.error(args);
  });

  res.on("finish", () => {
    logger.log('res.on("finish")...');
    const duration = getExecutionTime();
    const { method, url, protocol, hostname } = req;
    const { statusCode } = res;
    logger.info({
      rq: {
        method: req.method,
        h: hostname,
        url,
        protocol,
      },
      res: {
        code: statusCode,
      },
    });
  });

  next();
};
