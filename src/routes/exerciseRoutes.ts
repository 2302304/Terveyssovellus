import { Router } from 'express';
import {
  createExerciseEntry,
  getExerciseEntries,
  getExerciseEntry,
  updateExerciseEntry,
  deleteExerciseEntry,
} from '../controllers/exerciseController';
import { authenticate } from '../middleware/auth';

const router = Router();
router.use(authenticate);

router.post('/', createExerciseEntry);
router.get('/', getExerciseEntries);
router.get('/:id', getExerciseEntry);
router.put('/:id', updateExerciseEntry);
router.delete('/:id', deleteExerciseEntry);

export default router;