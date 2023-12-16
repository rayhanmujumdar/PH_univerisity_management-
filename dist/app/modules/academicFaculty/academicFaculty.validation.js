"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAcademicFacultyValidation = exports.createAcademicFacultyValidation = void 0;
const zod_1 = require("zod");
exports.createAcademicFacultyValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "name must be required" }),
    }),
});
exports.updateAcademicFacultyValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: "name must be required" }),
    }),
});
