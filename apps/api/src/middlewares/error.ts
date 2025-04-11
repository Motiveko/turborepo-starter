import type { ErrorRequestHandler } from "express";
import { NotFoundError } from "@api/errors/not-found";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.log("errorMiddleware");
  console.error(err);
  if (err instanceof NotFoundError) {
    return res.status(err.status).json({ error: err.message });
  }
  res.status(500).json({ error: "Internal Server Error" });
};
