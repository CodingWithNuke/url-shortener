import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  const { code } = req.body;

  if (!code || code !== process.env.CODE) {
    res.status(401);
    return next(new Error("Unauthorized"));
  }

  delete req.body.code;

  return next();
};
