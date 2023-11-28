"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchemaValidation = void 0;
const zod_1 = require("zod");
exports.userSchemaValidation = zod_1.z.object({
    password: zod_1.z
        .string({ required_error: "password must be required" })
        .max(20, { message: "password must be required" })
        .optional(),
});
