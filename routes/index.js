import express from 'express';
import UserController from '../controllers/usersController/users';

const router = express.Router();

router.get('/', UserController.getIndex);
router.get('/users/register', UserController.getRegistrationPage);
router.post('/users/register', UserController.registerUser);
router.get('/users/login', UserController.login);


export default router;
