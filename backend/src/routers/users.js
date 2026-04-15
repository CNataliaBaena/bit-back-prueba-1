import userController from '../controller/users.js';
import { Router } from 'express';
import { register, login } from "../controller/users.js";
import { validateRegister } from "../middleware/validate.middleware.js";
import { authRequired } from "../middleware/auth.middleware.js";

const userRouter = Router();

// Methode POST
userRouter.post("/register", validateRegister, register);
userRouter.post("/login", login);

// Methode GET ALL
userRouter.get('/' ,userController.readAll);

// Methode GET
userRouter.get('/:id', authRequired , userController.read);

// Methode PUT "Update"
userRouter.put('/:id' ,userController.update);

// Methode DELETE
userRouter.delete('/:id' ,userController.delete);

export default userRouter;