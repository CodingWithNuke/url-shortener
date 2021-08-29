import { Request, Response, NextFunction } from "express";

interface RequestError extends Error {
  statusCode?: number;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const error: RequestError = new Error(
    `Not Found - ${req.method} ${req.originalUrl}`
  );

  error.statusCode = 404;

  return next(error);
};
