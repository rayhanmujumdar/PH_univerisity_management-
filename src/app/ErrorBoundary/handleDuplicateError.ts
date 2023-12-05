/* eslint-disable @typescript-eslint/no-explicit-any */

import { TGenericErrorResponse } from "../interface/error";

/* eslint-disable @typescript-eslint/no-unused-vars */
const handleDuplicateError = (err: any): TGenericErrorResponse => {
    const message = err.message;
    const statusCode = 400;
    const matchedField = err.message.match(/"((?:\\.|[^\\"])*)"/);
    const errorSource = [
        {
            path: matchedField && matchedField[1],
            message: matchedField && matchedField[1] + " " + "already exist",
        },
    ];
    return {
        statusCode,
        message,
        errorSource,
    };
};
export default handleDuplicateError;
