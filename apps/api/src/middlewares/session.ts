/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion  -- session middleware와 express 타입간 버전 호환 문제 대응 */
import type { RequestHandler } from "express";
import session from "express-session";
import { Config } from "@api/config/env";

// TODO : redis 사용하도록 변경
export const sessionMiddleware = session({
  secret: Config.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}) as RequestHandler;
