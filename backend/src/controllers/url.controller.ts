import type { Request, Response } from "express";

import * as urlService from "../services/url.service.js";
import type { AuthRequest } from "../types/auth.js";
import { parsePagination } from "../utils/pagination.js";

export const createAnonymousShortUrl = async (req: Request, res: Response) => {
  const url = await urlService.createShortUrl(req.body.url, null);
  res.status(201).json({ message: "Short URL generated successfully", shortId: url.shortId });
};

export const createShortUrl = async (req: AuthRequest, res: Response) => {
  const url = await urlService.createShortUrl(req.body.url, req.userId!);
  res.status(201).json({ message: "Short URL generated successfully", shortId: url.shortId });
};

export const redirectToOriginalUrl = async (req: Request<{ shortId: string }>, res: Response) => {
  const destination = await urlService.resolveShortUrl(req.params.shortId);
  res.redirect(destination);
};

export const getUrlAnalytics = async (req: Request<{ shortId: string }>, res: Response) => {
  res.status(200).json(await urlService.getUrlAnalytics(req.params.shortId));
};

export const getMyUrls = async (req: AuthRequest, res: Response) => {
  const { urls, pagination } = await urlService.listUserUrls(req.userId!, parsePagination(req.query));
  res.status(200).json({ message: "Urls fetched successfully", data: urls, pagination });
};
