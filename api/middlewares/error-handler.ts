import { Request, Response, NextFunction } from "express";

interface RequestError extends Error {
  statusCode?: number;
}

export default (
  error: RequestError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(error.statusCode || statusCode);

  return res.json({
    statusCode: error.statusCode || statusCode,
    message: error.message || "An error occurred..."
  });
};
