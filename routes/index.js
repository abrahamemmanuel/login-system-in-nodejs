import express from 'express';
import UserController from '../controllers/usersController/users';

const router = express.Router();

router.get('/', UserController.getIndex);
router.get('/register', UserController.register);
router.get('/login', UserController.login);

export default router;
