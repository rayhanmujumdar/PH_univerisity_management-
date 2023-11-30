import { Router } from "express";
import { academicSemesterRoutes } from "../modules/academicSemester/academicSemester.routes";
import { userRouter } from "../modules/user/user.routes";

const rootRoutes = Router();

// user router
const moduleRoutes = [
    {
        path: "/users",
        route: userRouter,
    },
    {
        path: "/semester",
        route: academicSemesterRoutes,
    },
];
moduleRoutes.forEach((router) => rootRoutes.use(router.path, router.route));

export default rootRoutes;
