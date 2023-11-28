"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const rootRoutes = (0, express_1.Router)();
// user router
const moduleRoutes = [
    {
        path: "/users",
        route: user_routes_1.userRouter,
    },
];
moduleRoutes.forEach((router) => rootRoutes.use(router.path, router.route));
exports.default = rootRoutes;
