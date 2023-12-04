import { Response } from "express";

type TResponseData<T> = {
    success: boolean;
    message?: string;
    statusCode: number;
    data: T;
};

const sendResponse = <T>(res: Response, responseData: TResponseData<T>) => {
    res.status(responseData.statusCode).json({
        success: responseData.success,
        message: responseData.message,
        data: responseData.data,
    });
};

export default sendResponse;
