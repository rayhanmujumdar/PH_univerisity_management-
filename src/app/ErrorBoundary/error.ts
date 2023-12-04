// part - 1 (error handler)
const error = (
    statusCode = 500,
    message = "Internal Server error",
    stack = "",
) => {
    const err: Error & { statusCode?: number; stack?: string } = new Error(
        message,
    );
    err.statusCode = statusCode;
    if (stack) {
        err.stack = stack;
    }
    Error.captureStackTrace(err);
    return err;
};

// part - 2  (error handler)
export class AppError extends Error {
    public statusCode: number;
    constructor(
        statusCode: number = 500,
        message: string = "Internal server error ",
        stack: string = "",
    ) {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default error;
