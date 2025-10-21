import { Router } from 'express';
import {
  createSleepEntry,
  getSleepEntries,
  getSleepEntry,
  updateSleepEntry,
  deleteSleepEntry,
} from '../controllers/sleepController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);

router.post('/', createSleepEntry);
router.get('/', getSleepEntries);
router.get('/:id', getSleepEntry);
router.put('/:id', updateSleepEntry);
router.delete('/:id', deleteSleepEntry);

export default router;