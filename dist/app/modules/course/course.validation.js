"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseWithFacultyValidationSchema = exports.updateCourseValidationSchema = exports.createCourseValidationSchema = exports.preRequisiteCourseValidationSchema = void 0;
const zod_1 = require("zod");
exports.preRequisiteCourseValidationSchema = zod_1.z.object({
    course: zod_1.z.string(),
    isDeleted: zod_1.z.boolean().optional(),
});
exports.createCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "title must be required" }),
        prefix: zod_1.z.string({ required_error: "prefix must be required" }),
        code: zod_1.z.string({ required_error: "code must be required" }),
        credits: zod_1.z.number({ required_error: "credits must be required" }),
        isDeleted: zod_1.z.boolean().optional(),
        preRequisiteCourse: zod_1.z
            .array(exports.preRequisiteCourseValidationSchema)
            .optional(),
    }),
});
exports.updateCourseValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({ required_error: "title must be required" })
            .optional(),
        prefix: zod_1.z
            .string({ required_error: "prefix must be required" })
            .optional(),
        code: zod_1.z.string({ required_error: "code must be required" }).optional(),
        credits: zod_1.z
            .number({ required_error: "credits must be required" })
            .optional(),
        isDeleted: zod_1.z.boolean().optional(),
        preRequisiteCourse: zod_1.z
            .array(exports.preRequisiteCourseValidationSchema)
            .optional(),
    }),
});
exports.courseWithFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        course: zod_1.z.string().optional(),
        faculties: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
