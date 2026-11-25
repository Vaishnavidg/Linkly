import express from 'express';
import { handleGenerateShortUrl, handleGenerateShortUrlWithoutSignIn, handleRedirectToOriginalUrl, handleUsersUrls, hangleGetUrlAnalytics } from '../controllers/url.js';
import { verifyToken } from '../middleware/auth.middleware.js';
const router = express.Router();

router.post('/urls', handleGenerateShortUrlWithoutSignIn);

router.post('/url', verifyToken, handleGenerateShortUrl);

router.get('/user-urls',verifyToken, handleUsersUrls);

router.get('/url/analytics/:shortId', hangleGetUrlAnalytics);

router.get('/:shortId', handleRedirectToOriginalUrl);

export default router;