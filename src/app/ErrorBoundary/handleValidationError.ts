import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleValidationError = (
    err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
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
