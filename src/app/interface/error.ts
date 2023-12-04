export type TErrorSource = {
    path: string | number;
    message: string;
};

export type TErrorSimplify = {
    message: string;
    statusCode: string | number;
    errorSource: TErrorSource[];
};
