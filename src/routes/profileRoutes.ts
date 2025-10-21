import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/profileController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Kaikki reitit vaativat autentikoinnin
router.use(authenticate);

router.get('/', getProfile);
router.put('/', updateProfile);

export default router;