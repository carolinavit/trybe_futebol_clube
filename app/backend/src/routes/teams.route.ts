import { Router } from 'express';
import TeamsController from '../controllers/TeamController';

const router = Router();

const teamController = new TeamsController();

router.get('/', teamController.getAll);
router.get('/:id', teamController.getById);

export default router;
