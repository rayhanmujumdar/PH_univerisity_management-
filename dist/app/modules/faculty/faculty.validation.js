"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFacultyValidationSchema = exports.createFacultyValidationSchema = void 0;
const zod_1 = require("zod");
const student_validation_1 = require("../student/student.validation");
exports.createFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().min(6).max(20).optional(),
        faculty: zod_1.z.object({
            name: student_validation_1.userNameValidationSchema.required(),
            gender: zod_1.z.enum(["male", "female", "other"], {
                required_error: "gender must be required",
            }),
            age: zod_1.z.number({ required_error: "age must be required" }),
            dateOfBirth: zod_1.z.string({
                required_error: "dateOfBirth must be required",
            }),
            email: zod_1.z
                .string({ required_error: "email must be required" })
                .email({ message: "please provide a valid email address" }),
            contactNo: zod_1.z
                .string({ required_error: "contactNo must be required" })
                .refine((val) => {
                return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(val);
            }, {
                message: "please provided bangladeshi valid phone number",
            }),
            emergencyContactNo: zod_1.z
                .string({
                required_error: "emergencyContactNo must be required",
            })
                .refine((val) => {
                return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(val);
            }, {
                message: "please provided bangladeshi valid phone number",
            }),
            presentAddress: zod_1.z.string({
                required_error: "presentAddress must be required",
            }),
            permanentAddress: zod_1.z.string({
                required_error: "permanentAddress must be required",
            }),
            academicFaculty: zod_1.z.string({
                required_error: "academicFaculty must be required",
            }),
            academicDepartment: zod_1.z.string({
                required_error: "admissionSemester must be required",
            }),
            profileImg: zod_1.z.string().optional(),
            department: zod_1.z.string({
                required_error: "department must be required",
            }),
        }),
    }),
});
//
exports.updateFacultyValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: student_validation_1.updateUserNameValidationSchema.optional(),
        gender: zod_1.z
            .enum(["male", "female", "other"], {
            required_error: "gender must be required",
        })
            .optional(),
        age: zod_1.z.number({ required_error: "age must be required" }).optional(),
        dateOfBirth: zod_1.z
            .string({
            required_error: "dateOfBirth must be required",
        })
            .optional(),
        email: zod_1.z
            .string({ required_error: "email must be required" })
            .email({ message: "please provide a valid email address" })
            .optional(),
        contactNo: zod_1.z
            .string({ required_error: "contactNo must be required" })
            .refine((val) => {
            return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(val);
        }, {
            message: "please provided bangladeshi valid phone number",
        })
            .optional(),
        emergencyContactNo: zod_1.z
            .string({
            required_error: "emergencyContactNo must be required",
        })
            .refine((val) => {
            return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(val);
        }, {
            message: "please provided bangladeshi valid phone number",
        })
            .optional(),
        presentAddress: zod_1.z
            .string({
            required_error: "presentAddress must be required",
        })
            .optional(),
        permanentAddress: zod_1.z
            .string({
            required_error: "permanentAddress must be required",
        })
            .optional(),
        academicFaculty: zod_1.z
            .string({
            required_error: "academicFaculty must be required",
        })
            .optional(),
        academicDepartment: zod_1.z
            .string({
            required_error: "admissionSemester must be required",
        })
            .optional(),
        designation: zod_1.z
            .string({
            required_error: "designation must be required",
        })
            .optional(),
        profileImg: zod_1.z.string().optional(),
        department: zod_1.z
            .string({
            required_error: "department must be required",
        })
            .optional(),
    }),
});
