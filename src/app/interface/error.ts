export type TErrorSource = {
    path: string | number;
    message: string;
};

export type TGenericErrorResponse = {
    message: string;
    statusCode: string | number;
    errorSource: TErrorSource[];
};
