import { Router } from 'express';
import {
  createMoodEntry,
  getMoodEntries,
  getMoodEntry,
  updateMoodEntry,
  deleteMoodEntry,
} from '../controllers/moodController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);

router.post('/', createMoodEntry);
router.get('/', getMoodEntries);
router.get('/:id', getMoodEntry);
router.put('/:id', updateMoodEntry);
router.delete('/:id', deleteMoodEntry);

export default router;