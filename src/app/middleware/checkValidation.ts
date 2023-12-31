import { AnyZodObject, ZodOptional } from "zod";
import catchAsync from "../lib/catchAsync";

const checkValidation = (schema: AnyZodObject | ZodOptional<AnyZodObject>) => {
    return catchAsync(async (req, _res, next) => {
        // validation and if req.body data is valid (checking zod validation) then pass to next middleware
        await schema.parseAsync({
            body: req.body,
            cookie: req.cookies,
        });
        next();
    });
};

export default checkValidation;
