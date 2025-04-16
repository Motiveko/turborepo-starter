import type { Request, Response, NextFunction } from "express";

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  res.status(401).json({ message: "Unauthorized: Login required" });
};
