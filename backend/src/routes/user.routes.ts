import { Router } from "express";

import { getCurrentUser, login, signup } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { signinSchema, signupSchema } from "../validators/auth.validator.js";

const router = Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(signinSchema), login);
router.get("/me", verifyToken, getCurrentUser);

export default router;
