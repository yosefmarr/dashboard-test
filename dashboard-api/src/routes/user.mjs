import { Router } from 'express';
import Auth from '../middlewares/auth.mjs';
import { getUserData } from '../controllers/user.mjs';

const router = Router();

router.get('/', Auth, getUserData);

export default router;
