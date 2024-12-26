import  express from "express"
import { userController } from "./user.controller";


const router = express.Router();

router.post('/crate-student', userController.createStudent);


export const UserRoutes = router;