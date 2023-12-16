"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAcademicDepartmentValidation = exports.createAcademicDepartmentValidation = void 0;
const zod_1 = require("zod");
exports.createAcademicDepartmentValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "name must be required",
            invalid_type_error: "name must be a string value",
        })
            .trim(),
        academicFacultyId: zod_1.z.string({
            required_error: "academicFacultyId must be required",
            invalid_type_error: "academicFacultyId must be a string",
        }),
    }),
});
exports.updateAcademicDepartmentValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "name must be required",
            invalid_type_error: "name must be a string value",
        })
            .trim()
            .optional(),
        academicFacultyId: zod_1.z
            .string({
            required_error: "academicFacultyId must be required",
            invalid_type_error: "academicFacultyId must be a string",
        })
            .optional(),
    }),
});
