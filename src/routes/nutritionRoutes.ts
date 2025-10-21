import { Router } from 'express';
import {
  createNutritionEntry,
  getNutritionEntries,
  getNutritionEntry,
  updateNutritionEntry,
  deleteNutritionEntry,
} from '../controllers/nutritionController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Kaikki reitit vaativat autentikoinnin
router.use(authenticate);

router.post('/', createNutritionEntry);
router.get('/', getNutritionEntries);
router.get('/:id', getNutritionEntry);
router.put('/:id', updateNutritionEntry);
router.delete('/:id', deleteNutritionEntry);

export default router;