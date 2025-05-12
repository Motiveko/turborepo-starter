import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "@api/lib/jwt";
import userService from "@api/services/user";
import { UnauthorizedError } from "@api/errors/un-authorized";

const ensureAuthenticatedByJwt = async (
  req: Request,
  _: Response,
  __: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return false;
  }

  const payload = verifyToken(token);
  if (typeof payload === "object" && typeof payload.id === "number") {
    const user = await userService.getById(payload.id);
    if (user) {
      req.user = user;
      return true;
    }
  }
  return false;
};

export const ensureAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (await ensureAuthenticatedByJwt(req, res, next)) {
    next();
    return;
  }

  if (req.isAuthenticated()) {
    next();
    return;
  }

  next(new UnauthorizedError("Unauthorized: Login required"));
};
