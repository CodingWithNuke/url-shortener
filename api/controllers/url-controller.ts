import { Request, Response, NextFunction } from "express";
import { nanoid } from "nanoid";

import { URL_PATTERN } from "../constants";

import { Url } from "../models";

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const urls = await Url.find({});

  return res.json(urls);
};

export const findOneBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const url = await Url.findOne({ slug: req.params.slug });

  return res.json(url);
};

export const createOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { url, slug } = req.body;

  if (!url) {
    res.status(411);
    return next(new Error("Url is required."));
  }

  if (!URL_PATTERN.test(url)) {
    url = `https://${url}`;
  }

  if (!slug) {
    slug = nanoid(10);
  }

  slug = slug.toLowerCase();

  const newUrl = await Url.create({
    slug,
    url
  });

  return res.status(201).json(newUrl);
};

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  const url = await Url.findOneAndUpdate({ id }, req.body, { new: true });

  return res.json(url);
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  await Url.deleteOne({ id });

  return res.status(204).end();
};
