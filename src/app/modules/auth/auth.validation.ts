import { z } from "zod";

export const loginValidationSchema = z.object({
    body: z.object({
        id: z.string({ required_error: "id must be required" }),
        password: z.string({ required_error: "password must be required" }),
    }),
});

export const changePasswordValidationSchema = z.object({
    body: z.object({
        oldPassword: z.string({
            required_error: "old password must be required",
        }),
        password: z.string({ required_error: "password must be required" }),
    }),
});

export const refreshTokenValidationSchema = z.object({
    cookie: z.object({
        refreshToken: z.string({
            required_error: "refresh token must be required",
        }),
    }),
});

export type TChangePassword = z.infer<
    typeof changePasswordValidationSchema.shape.body
>;
