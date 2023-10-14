import { Router } from 'express';
import Auth from '../middlewares/auth.mjs';
import { getUserData } from '../controllers/user.mjs';
import { setLanguage } from '../controllers/settings.mjs';

const router = Router();

router.get('/', Auth, getUserData);

router.post('/settings/language', Auth, setLanguage);

export default router;
