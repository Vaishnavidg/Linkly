import express from 'express';
import { handleUserLogin, handleUserSignup } from '../controllers/user.js';
import { validate } from '../middleware/validate.middleware.js';
import { signinSchema, signupSchema } from '../validators/auth.validator.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { handleGetCurrentUser } from '../controllers/auth.js';

const router = express.Router();

router.post('/signup',validate(signupSchema),handleUserSignup);

router.post('/login',validate(signinSchema),handleUserLogin);

router.get("/me", verifyToken, handleGetCurrentUser);

export default router;