import type { ErrorRequestHandler } from "express";
import { NotFoundError } from "@api/errors/not-found";
import { ValidationError } from "@api/errors/validation";
import { UnauthorizedError } from "@api/errors/un-authorized";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.message);
  if (err instanceof NotFoundError) {
    return res.status(err.status).json({ error: err.message });
  }
  if (err instanceof ValidationError) {
    return res.status(400).json({ error: err.message });
  }

  if (err instanceof UnauthorizedError) {
    return res.status(401).json({ error: err.message });
  }

  res.status(500).json({ error: "Internal Server Error" });
};
