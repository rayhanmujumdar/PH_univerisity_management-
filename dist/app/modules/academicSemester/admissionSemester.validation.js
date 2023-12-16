"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdmissionSemesterValidationSchema = exports.createAdmissionSemesterValidationSchema = void 0;
const zod_1 = require("zod");
const academicSemester_constant_1 = require("./academicSemester.constant");
exports.createAdmissionSemesterValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.enum([...academicSemester_constant_1.academicSemesterName], {
            required_error: "name must be required",
        }),
        year: zod_1.z.string({ required_error: "year must be required" }),
        code: zod_1.z.enum([...academicSemester_constant_1.academicSemesterCode], {
            required_error: "code must be required",
        }),
        startMonth: zod_1.z.enum([...academicSemester_constant_1.months], {
            required_error: "startMonth must be required",
        }),
        endMonth: zod_1.z.enum([...academicSemester_constant_1.months], {
            required_error: "endMonth must be required",
        }),
    }),
});
exports.updateAdmissionSemesterValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .enum([...academicSemester_constant_1.academicSemesterName], {
            required_error: "name must be required",
        })
            .optional(),
        year: zod_1.z.string({ required_error: "year must be required" }).optional(),
        code: zod_1.z
            .enum([...academicSemester_constant_1.academicSemesterCode], {
            required_error: "code must be required",
        })
            .optional(),
        startMonth: zod_1.z
            .enum([...academicSemester_constant_1.months], {
            required_error: "startMonth must be required",
        })
            .optional(),
        endMonth: zod_1.z
            .enum([...academicSemester_constant_1.months], {
            required_error: "endMonth must be required",
        })
            .optional(),
    }),
});
