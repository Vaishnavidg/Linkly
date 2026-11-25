import { format } from "date-fns";

import { API_URL } from "../api/config";
import type { ShortUrl } from "../types/index";

/** Id of the dashboard's "create short URL" input, so other parts can focus it. */
export const CREATE_URL_INPUT_ID = "dashboard-url-input";

export const shortLink = (url: ShortUrl) => `${API_URL}/${url.shortId}`;

export const stripProtocol = (value: string) => value.replace(/^https?:\/\//, "");

export const clicksOf = (url: ShortUrl) => url.visitHistory?.length ?? 0;

export const formatDate = (value: string) => {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : format(date, "MMM dd, yyyy");
};
