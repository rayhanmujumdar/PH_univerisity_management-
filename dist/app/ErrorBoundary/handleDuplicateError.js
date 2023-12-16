"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
const handleDuplicateError = (err) => {
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
exports.default = handleDuplicateError;
