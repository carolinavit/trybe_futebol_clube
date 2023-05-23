import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';
import authToken from '../middlewares/authToken';

const router = Router();

const matchesController = new MatchesController();

router.get('/matches', matchesController.getAll);
router.patch('/matches/:id/finish', authToken, matchesController.finishMatch);
router.patch('/matches/:id', authToken, matchesController.update);
router.post('/matches', authToken, matchesController.create);
router.get('/leaderboard/home', matchesController.getHomeLeaderboard);

export default router;
