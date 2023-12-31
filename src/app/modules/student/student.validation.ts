import { z } from "zod";
import { bloodGroup } from "../faculty/faculty.model";

export const userNameValidationSchema = z.object({
    firstName: z
        .string({ required_error: "firstName must be required" })
        // .min(6, { message: "firstName more then 6 characters" })
        .max(20, { message: "firstName less then 20 characters" })
        .trim()
        .regex(new RegExp("[A-Z][a-z]*"), {
            message: "firstName must be capitalize",
        }),
    lastName: z.string({ required_error: "lastName must be required" }).trim(),
});
export const updateUserNameValidationSchema = z.object({
    firstName: z
        .string({ required_error: "firstName must be required" })
        // .min(6, { message: "firstName more then 6 characters" })
        .max(20, { message: "firstName less then 20 characters" })
        .trim()
        .regex(new RegExp("[A-Z][a-z]*"), {
            message: "firstName must be capitalize",
        })
        .optional(),
    lastName: z
        .string({ required_error: "lastName must be required" })
        .trim()
        .optional(),
});

export const guardianValidationSchema = z.object({
    name: z.string({ required_error: "name must be required" }).trim(),
    age: z.number({ required_error: "age must be required" }),
    relation: z.enum(["father", "mother", "brother", "other"]),
    occupation: z.string({ required_error: "occupation must be required" }),
    gender: z.enum(["male", "female", "other"], {
        required_error: "gender must be required",
    }),
    contactNo: z
        .string({ required_error: "contactNo must be required" })
        .refine(
            (val) => {
                return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(val);
            },
            { message: "please provided bangladeshi valid phone number" },
        ),
});

export const localGuardianValidationSchema = z.object({
    name: z.string({ required_error: "name must be required" }).trim(),
    occupation: z.string({ required_error: "occupation must be required" }),
    gender: z.enum(["male", "female", "other"]),
    contactNo: z
        .string({ required_error: "contactNo must be required" })
        .refine(
            (val) => {
                return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(val);
            },
            { message: "please provided bangladeshi valid phone number" },
        ),
});

export const createStudentValidationSchema = z.object({
    body: z.object({
        password: z.string().min(6).max(20).optional(),
        student: z.object({
            name: userNameValidationSchema.required(),
            gender: z.enum(["male", "female", "other"], {
                required_error: "gender must be required",
            }),
            age: z.number({ required_error: "age must be required" }),
            dateOfBirth: z.string({
                required_error: "dateOfBirth must be required",
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
            guardian: guardianValidationSchema.required(),
            localGuardian: localGuardianValidationSchema.required(),
            academicSemester: z.string({
                required_error: "admissionSemester must be required",
            }),
            academicDepartment: z.string({
                required_error: "admissionSemester must be required",
            }),
            profileImg: z.string().optional(),
            department: z.string({
                required_error: "department must be required",
            }),
        }),
    }),
});

export const updateStudentValidationSchema = z.object({
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
        guardian: guardianValidationSchema.optional(),
        localGuardian: localGuardianValidationSchema.optional(),
        academicSemester: z
            .string({
                required_error: "admissionSemester must be required",
            })
            .optional(),
        academicDepartment: z
            .string({
                required_error: "admissionSemester must be required",
            })
            .optional(),
        profileImg: z.string().optional(),
        department: z
            .string({
                required_error: "department must be required",
            })
            .optional(),
    }),
});
