import { Router } from 'express';
import usersController from '../controllers/users.controller.js';
import { authenticateToken } from '../middlewares/authenticate.middleware.js';


const router = Router();

// router.get('/',usersController.getUsers);
// router.post('/',usersController.CreateUser);

router
.route('/')
.get(usersController.getUsers)
.post(usersController.CreateUser);

router.route('/:id')
.get(authenticateToken, usersController.getUser)
.put(authenticateToken,usersController.updateUser)
.delete(authenticateToken,usersController.deleteUser)
.patch(authenticateToken,usersController.activateInactive);

router.get('/:id/tasks',authenticateToken, usersController.getTask)

export default router;

