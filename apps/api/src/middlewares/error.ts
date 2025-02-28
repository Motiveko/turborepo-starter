import { NotFoundError } from "@api/errors/not-found";
import { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.log("error middleware called");
  if (err instanceof NotFoundError) {
    return res.status(err.status).json({ error: err.message });
  }

  res.status(500).json({ error: "Internal Server Error" });
};
