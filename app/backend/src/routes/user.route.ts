import { Router } from 'express';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/userMiddleware';

const router = Router();

const userController = new UserController();

router.post('/', validateLogin, userController.signin);

export default router;
