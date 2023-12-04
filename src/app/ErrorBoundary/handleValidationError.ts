import mongoose from "mongoose";
import { TErrorSimplify, TErrorSource } from "../interface/error";

const handleValidationError = (
    err: mongoose.Error.ValidationError,
): TErrorSimplify => {
    const message = "Validation error";
    const statusCode = 400;
    const errorSource = Object.values(err.errors).map(
        (
            val: mongoose.Error.ValidatorError | mongoose.Error.CastError,
        ): TErrorSource => {
            return {
                path: val.path,
                message: val.message,
            };
        },
    );
    return {
        message,
        statusCode,
        errorSource,
    };
};

export default handleValidationError;
