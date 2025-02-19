// import { Router } from "express";
// import { StudentRoutes } from "../modules/students/student.route";
// import { UserRoutes } from "../modules/user/user.route";
// const router = Router();
// const moduleRouter = [
//     {
//         path: '/student',
//         route: StudentRoutes,
//     },
//     {
//         path: '/users',
//         route: UserRoutes,
//     }
// ]
// moduleRouter.forEach(route => router.use(route.path, route.route))
// export default router;


import { Router } from "express"
import { StudentRoutes } from "../modules/students/student.route"
import { UserRoutes } from "../modules/user/user.route"
import { AcademicSemesterRoutes } from "../modules/academicSemester/academicSemester.route"
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route"
import { AcademicDepartmentRouter } from "../modules/academicDepartment/academicDepartment.route"
const router = Router()
const moduleRouter = [
    {
        path : '/student',
        route : StudentRoutes,
    },
    {
        path : '/users',
        route : UserRoutes,
    },
    {
        path : '/academic-semesters',
        route : AcademicSemesterRoutes,
        
    },
    {
        path : '/academic-faculties',
        route : AcademicFacultyRoutes,
        
    },
    {
        path : '/academic-department',
        route : AcademicDepartmentRouter,
        
    }
]
moduleRouter.forEach(route => router.use(route.path, route.route))
export default router;
