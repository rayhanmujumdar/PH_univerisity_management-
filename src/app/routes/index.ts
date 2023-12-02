import { Router } from "express";
import academicDepartmentRoutes from "../modules/academicDepartment/academicDepartment.routes";
import academicFacultyRoutes from "../modules/academicFaculty/academicFaculty.routes";
import { academicSemesterRoutes } from "../modules/academicSemester/academicSemester.routes";
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
        path: "/semester",
        route: academicSemesterRoutes,
    },
    {
        path: "/faculty",
        route: academicFacultyRoutes,
    },
    {
        path: "/department",
        route: academicDepartmentRoutes,
    },
];
moduleRoutes.forEach((router) => rootRoutes.use(router.path, router.route));

export default rootRoutes;
