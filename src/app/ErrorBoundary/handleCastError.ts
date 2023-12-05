import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interface/error";

const handleCastError = (
    err: mongoose.Error.CastError,
): TGenericErrorResponse => {
    const message = "Invalid ID";
    const statusCode = 400;
    const errorSource = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    return {
        statusCode,
        message,
        errorSource,
    };
};

export default handleCastError;
