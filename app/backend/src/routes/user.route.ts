import { Router } from 'express';
import UserController from '../controllers/UserController';
import validateLogin from '../middlewares/userMiddleware';
import authToken from '../middlewares/authToken';

const router = Router();

const userController = new UserController();

router.post('/', validateLogin, userController.signin);
router.get('/role', authToken, userController.getRole);

export default router;
