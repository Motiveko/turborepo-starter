import type { RequestHandler } from "express";
import logger from "@api/lib/logger";
import { startTimer } from "@api/lib/timer";

export const loggerMiddleware: RequestHandler = (req, res, next) => {
  const getExecutionTime = startTimer();
  res.on("error", (args) => {
    // console.error(args);
    logger.error(args);
  });

  res.on("finish", () => {
    const duration = getExecutionTime();
    const { method, url, protocol, hostname } = req;
    const { statusCode } = res;
    logger.info({
      rq: {
        method,
        h: hostname,
        url,
        protocol,
        ptime: duration,
      },
      res: {
        code: statusCode,
      },
    });
  });

  next();
};
