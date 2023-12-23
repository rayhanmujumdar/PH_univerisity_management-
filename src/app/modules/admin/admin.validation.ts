import { z } from "zod";
import { bloodGroup } from "../faculty/faculty.model";
import {
    updateUserNameValidationSchema,
    userNameValidationSchema,
} from "../student/student.validation";

export const createAdminValidationSchema = z.object({
    body: z.object({
        password: z.string().min(6).max(20).optional(),
        admin: z.object({
            name: userNameValidationSchema.required(),
            gender: z.enum(["male", "female", "other"], {
                required_error: "gender must be required",
            }),
            age: z.number({ required_error: "age must be required" }),
            dateOfBirth: z.string({
                required_error: "dateOfBirth must be required",
            }),
            designation: z.string({
                required_error: "designation must be required",
            }),
            bloodGroup: z.enum([...bloodGroup] as [string, ...string[]], {
                required_error: "bloodGroup must be required",
            }),
            email: z
                .string({ required_error: "email must be required" })
                .email({ message: "please provide a valid email address" }),
            contactNo: z
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
            emergencyContactNo: z
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
            presentAddress: z.string({
                required_error: "presentAddress must be required",
            }),
            permanentAddress: z.string({
                required_error: "permanentAddress must be required",
            }),
            profileImg: z.string().optional(),
        }),
    }),
});

//
export const updateAdminValidationSchema = z.object({
    body: z.object({
        name: updateUserNameValidationSchema.optional(),
        gender: z
            .enum(["male", "female", "other"], {
                required_error: "gender must be required",
            })
            .optional(),
        age: z.number({ required_error: "age must be required" }).optional(),
        dateOfBirth: z
            .string({
                required_error: "dateOfBirth must be required",
            })
            .optional(),
        bloodGroup: z
            .enum([...bloodGroup] as [string, ...string[]], {
                required_error: "bloodGroup must be required",
            })
            .optional(),
        email: z
            .string({ required_error: "email must be required" })
            .email({ message: "please provide a valid email address" })
            .optional(),
        contactNo: z
            .string({ required_error: "contactNo must be required" })
            .refine(
                (val) => {
                    return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(
                        val,
                    );
                },
                {
                    message: "please provided bangladeshi valid phone number",
                },
            )
            .optional(),
        emergencyContactNo: z
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
                    message: "please provided bangladeshi valid phone number",
                },
            )
            .optional(),
        presentAddress: z
            .string({
                required_error: "presentAddress must be required",
            })
            .optional(),
        permanentAddress: z
            .string({
                required_error: "permanentAddress must be required",
            })
            .optional(),
        designation: z
            .string({
                required_error: "designation must be required",
            })
            .optional(),
        profileImg: z.string().optional(),
    }),
});
