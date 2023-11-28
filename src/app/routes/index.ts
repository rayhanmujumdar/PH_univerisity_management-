import { Router } from "express";
import { userRouter } from "../modules/user/user.routes";

const rootRoutes = Router();

// user router
const moduleRoutes = [
    {
        path: "/users",
        route: userRouter,
    },
];
moduleRoutes.forEach((router) => rootRoutes.use(router.path, router.route));

export default rootRoutes;
