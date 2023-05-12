import { Router } from 'express';
import TeamsController from '../controllers/TeamController';

const router = Router();

const teamController = new TeamsController();

router.get('/', teamController.getAll);

export default router;
