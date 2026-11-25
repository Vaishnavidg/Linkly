import { z } from "zod";

import { normalizeHttpUrl } from "../utils/url.js";

export const createUrlSchema = z.object({
  url: z
    .string({ error: "Original URL is required" })
    .trim()
    .min(1, "Original URL is required")
    .transform((value, ctx) => {
      const normalized = normalizeHttpUrl(value);
      if (!normalized) {
        ctx.addIssue({ code: "custom", message: "Enter a valid http(s) URL, e.g. https://example.com" });
        return z.NEVER;
      }
      return normalized;
    }),
});
