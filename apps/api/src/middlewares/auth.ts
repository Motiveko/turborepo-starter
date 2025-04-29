import type { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "@api/errors/un-authorized";

  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  next(new UnauthorizedError("Unauthorized: Login required"));
};
