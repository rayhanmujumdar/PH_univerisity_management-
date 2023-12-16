"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const academicDepartment_routes_1 = __importDefault(require("../modules/academicDepartment/academicDepartment.routes"));
const academicFaculty_routes_1 = __importDefault(require("../modules/academicFaculty/academicFaculty.routes"));
const academicSemester_routes_1 = require("../modules/academicSemester/academicSemester.routes");
const course_routes_1 = __importDefault(require("../modules/course/course.routes"));
const faculty_routes_1 = __importDefault(require("../modules/faculty/faculty.routes"));
const student_routes_1 = __importDefault(require("../modules/student/student.routes"));
const user_routes_1 = require("../modules/user/user.routes");
const rootRoutes = express_1.Router();
// user router
const moduleRoutes = [
    {
        path: "/users",
        route: user_routes_1.userRouter,
    },
    {
        path: "/student",
        route: student_routes_1.default,
    },
    {
        path: "/faculties",
        route: faculty_routes_1.default,
    },
    {
        path: "/academic-semester",
        route: academicSemester_routes_1.academicSemesterRoutes,
    },
    {
        path: "/academic-faculty",
        route: academicFaculty_routes_1.default,
    },
    {
        path: "/academic-department",
        route: academicDepartment_routes_1.default,
    },
    {
        path: "/course",
        route: course_routes_1.default,
    },
];
moduleRoutes.forEach((router) => rootRoutes.use(router.path, router.route));
exports.default = rootRoutes;
