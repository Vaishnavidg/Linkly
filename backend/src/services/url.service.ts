import { nanoid } from "nanoid";

import UrlModel from "../models/url.model.js";
import UserModel from "../models/user.model.js";
import { HttpError } from "../utils/httpError.js";
import type { Pagination } from "../utils/pagination.js";

const SHORT_ID_LENGTH = 8;

/** Creates a short URL. Pass `userId = null` for anonymous links. */
export async function createShortUrl(originalUrl: string, userId: string | null) {
  const url = await UrlModel.create({
    shortId: nanoid(SHORT_ID_LENGTH),
    originalUrl,
    visitHistory: [],
    user: userId,
  });

  if (userId) {
    await UserModel.findByIdAndUpdate(userId, { $push: { urls: url._id } });
  }

  return url;
}

/** Looks up a short URL, records the visit, and returns the destination. */
export async function resolveShortUrl(shortId: string): Promise<string> {
  const url = await UrlModel.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: new Date() } } },
    { new: true }
  );
  if (!url) throw new HttpError(404, "Short URL not found");
  return url.originalUrl;
}

export async function getUrlAnalytics(shortId: string) {
  const url = await UrlModel.findOne({ shortId });
  if (!url) throw new HttpError(404, "Short URL not found");

  return {
    shortId: url.shortId,
    originalUrl: url.originalUrl,
    totalClicks: url.visitHistory.length,
    visitHistory: url.visitHistory,
  };
}

/** A page of the user's URLs, newest first. */
export async function listUserUrls(userId: string, { page, limit, skip }: Pagination) {
  const [userExists, urls, totalUrls] = await Promise.all([
    UserModel.exists({ _id: userId }),
    UrlModel.find({ user: userId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
    UrlModel.countDocuments({ user: userId }),
  ]);
  if (!userExists) throw new HttpError(404, "User not found");

  const totalPages = Math.ceil(totalUrls / limit);
  return {
    urls,
    pagination: {
      currentPage: page,
      limit,
      totalUrls,
      totalPage: totalPages,
      nextPage: page < totalPages,
      previousPage: page > 1,
    },
  };
}
