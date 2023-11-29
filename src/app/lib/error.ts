const error = (statusCode = 500, message = "Internal Server error") => {
    const err: Error & { statusCode?: number } = new Error(message);
    err.statusCode = statusCode;
    return err;
};

export default error;
