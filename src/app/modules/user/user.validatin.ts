import { z } from "zod";

export const userSchemaValidation = z.object({
    password: z
        .string({ required_error: "password must be required" })
        .max(20, { message: "password must be required" })
        .optional(),
});

export type TUserValidation = z.infer<typeof userSchemaValidation>;
