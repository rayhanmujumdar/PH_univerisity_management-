"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidationSchema =
    exports.localGuardianValidationSchema =
    exports.guardianValidationSchema =
    exports.userNameValidationSchema =
        void 0;
const zod_1 = require("zod");
exports.userNameValidationSchema = zod_1.z.object({
    firstName: zod_1.z
        .string({ required_error: "firstName must be required" })
        // .min(6, { message: "firstName more then 6 characters" })
        .max(20, { message: "firstName less then 20 characters" })
        .trim()
        .regex(new RegExp("[A-Z][a-z]*"), {
            message: "firstName must be capitalize",
        }),
    lastName: zod_1.z
        .string({ required_error: "lastName must be required" })
        .trim(),
});
exports.guardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: "name must be required" }).trim(),
    age: zod_1.z.number({ required_error: "age must be required" }),
    relation: zod_1.z.enum(["father", "mother", "brother", "other"]),
    occupation: zod_1.z.string({
        required_error: "occupation must be required",
    }),
    gender: zod_1.z.enum(["male", "female", "other"], {
        required_error: "gender must be required",
    }),
    contactNo: zod_1.z
        .string({ required_error: "contactNo must be required" })
        .refine(
            (val) => {
                return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(val);
            },
            { message: "please provided bangladeshi valid phone number" },
        ),
});
exports.localGuardianValidationSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: "name must be required" }).trim(),
    occupation: zod_1.z.string({
        required_error: "occupation must be required",
    }),
    gender: zod_1.z.enum(["male", "female", "other"]),
    contactNo: zod_1.z
        .string({ required_error: "contactNo must be required" })
        .refine(
            (val) => {
                return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(val);
            },
            { message: "please provided bangladeshi valid phone number" },
        ),
});
exports.studentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().min(6).max(20).optional(),
        student: zod_1.z.object({
            name: exports.userNameValidationSchema.required(),
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
                .refine(
                    (val) => {
                        return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(
                            val,
                        );
                    },
                    {
                        message:
                            "please provided bangladeshi valid phone number",
                    },
                ),
            emergencyContactNo: zod_1.z
                .string({
                    required_error: "emergencyContactNo must be required",
                })
                .refine(
                    (val) => {
                        return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(
                            val,
                        );
                    },
                    {
                        message:
                            "please provided bangladeshi valid phone number",
                    },
                ),
            presentAddress: zod_1.z.string({
                required_error: "presentAddress must be required",
            }),
            permanentAddress: zod_1.z.string({
                required_error: "permanentAddress must be required",
            }),
            guardian: exports.guardianValidationSchema.required(),
            localGuardian: exports.localGuardianValidationSchema.required(),
            profileImg: zod_1.z.string().regex(new RegExp("")).optional(),
            department: zod_1.z.string({
                required_error: "department must be required",
            }),
        }),
    }),
});
