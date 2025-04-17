import type { RequestHandler } from "express";
import logger from "@api/lib/logger";
import { startTimer } from "@api/lib/timer";

export const loggerMiddleware: RequestHandler = (req, res, next) => {
  const getExecutionTime = startTimer();
  // Store original res.send
  const originalSend = res.send;
  let responseBody: any = null;

  // Override res.send
  res.send = (body): typeof res => {
    responseBody = body;
    res.send = originalSend;
    return originalSend.call(res, body);
  };

  res.on("error", (args) => {
    // console.error(args);
    logger.error(args);
  });

  res.on("finish", () => {
    const duration = getExecutionTime();
    const { method, url, protocol, hostname } = req;
    const { statusCode } = res; // Remove body from here

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
        ...(responseBody && { body: responseBody }),
      },
    });
  });

  next();
};
