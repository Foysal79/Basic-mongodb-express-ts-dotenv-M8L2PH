import { Router } from "express";
import { StudentRoutes } from "../modules/students/student.route";
import { UserRoutes } from "../modules/user/user.route";


const router = Router();

const moduleRouter = [
    {
        path: '/student',
        route: StudentRoutes,
    },
    {
        path: '/users',
        route: UserRoutes,
    }
]

moduleRouter.forEach(route => router.use(route.path, route.route))

export default router;