import { z } from "zod";
import { userStatus } from "./user.constant";

export const userSchemaValidation = z.object({
    password: z
        .string({ required_error: "password must be required" })
        .max(20, { message: "password must be required" })
        .optional(),
});

export const changeStatusValidationSchema = z.object({
    body: z.object({
        status: z.enum([...(userStatus as [string, ...string[]])], {
            required_error: "status must be required",
        }),
    }),
});

export type TUserValidation = z.infer<typeof userSchemaValidation>;
export type TUserStatus = z.infer<typeof changeStatusValidationSchema>;
