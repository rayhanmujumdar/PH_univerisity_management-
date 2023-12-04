import { ZodError } from "zod";
import { TErrorSource } from "../interface/error";

const handleZodError = (err: ZodError) => {
    const message = "validation error";
    const statusCode = 400;
    const errorSource: TErrorSource[] = err.issues.map((issue) => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    return {
        message,
        statusCode,
        errorSource,
    };
};

export default handleZodError;
