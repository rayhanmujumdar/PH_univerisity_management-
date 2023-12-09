import { Router } from "express";
import academicDepartmentRoutes from "../modules/academicDepartment/academicDepartment.routes";
import academicFacultyRoutes from "../modules/academicFaculty/academicFaculty.routes";
import { academicSemesterRoutes } from "../modules/academicSemester/academicSemester.routes";
import facultyRoutes from "../modules/faculty/faculty.routes";
import studentRoutes from "../modules/student/student.routes";
import { userRouter } from "../modules/user/user.routes";
import { TRouter } from "./route.interface";

const rootRoutes = Router();

// user router
const moduleRoutes: TRouter[] = [
    {
        path: "/users",
        route: userRouter,
    },
    {
        path: "/student",
        route: studentRoutes,
    },
    {
        path: "/faculties",
        route: facultyRoutes,
    },
    {
        path: "/academic-semester",
        route: academicSemesterRoutes,
    },
    {
        path: "/academic-faculty",
        route: academicFacultyRoutes,
    },
    {
        path: "/academic-department",
        route: academicDepartmentRoutes,
    },
];
moduleRoutes.forEach((router) => rootRoutes.use(router.path, router.route));

export default rootRoutes;
