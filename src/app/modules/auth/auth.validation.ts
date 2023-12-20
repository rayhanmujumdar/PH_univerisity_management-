import { z } from "zod";

export const loginValidationSchema = z.object({
    body: z.object({
        id: z.string({ required_error: "id must be required" }),
        password: z.string({ required_error: "password must be required" }),
    }),
});
