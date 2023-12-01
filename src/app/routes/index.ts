import { Router } from "express";
import academicFacultyRoutes from "../modules/academicFaculty/academicFaculty.routes";
import { academicSemesterRoutes } from "../modules/academicSemester/academicSemester.routes";
import { userRouter } from "../modules/user/user.routes";

const rootRoutes = Router();

// user router
const moduleRoutes: { path: string; route: Router }[] = [
    {
        path: "/users",
        route: userRouter,
    },
    {
        path: "/semester",
        route: academicSemesterRoutes,
    },
    {
        path: "/faculty",
        route: academicFacultyRoutes,
    },
];
moduleRoutes.forEach((router) => rootRoutes.use(router.path, router.route));

export default rootRoutes;
