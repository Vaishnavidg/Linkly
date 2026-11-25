import { Router } from "express";

import {
  createAnonymousShortUrl,
  createShortUrl,
  getMyUrls,
  getUrlAnalytics,
  redirectToOriginalUrl,
} from "../controllers/url.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { createUrlSchema } from "../validators/url.validator.js";

const router = Router();

router.post("/urls", validate(createUrlSchema), createAnonymousShortUrl);
router.post("/url", verifyToken, validate(createUrlSchema), createShortUrl);
router.get("/user-urls", verifyToken, getMyUrls);
router.get("/url/analytics/:shortId", getUrlAnalytics);
// Must stay last: it matches any single path segment.
router.get("/:shortId", redirectToOriginalUrl);

export default router;
