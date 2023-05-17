import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import authToken from '../middlewares/authToken';

const router = Router();

const matchesController = new MatchesController();

router.get('/', matchesController.getAll);
router.patch('/:id/finish', authToken, matchesController.finishMatch);
router.patch('/:id', authToken, matchesController.update);

export default router;
