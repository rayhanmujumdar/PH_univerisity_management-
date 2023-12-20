import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../ErrorBoundary/error";
import config from "../config";
import catchAsync from "../lib/catchAsync";
import { TUser_Role } from "../modules/user/user.interface";
export default function auth(...requestedRole: TUser_Role[]) {
    return catchAsync(async (req, _res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError(httpStatus.FORBIDDEN, "forbidden");
        }
        jwt.verify(token, config.jwt_secret as string, (err, decoded): void => {
            if (err) {
                throw new AppError(httpStatus.FORBIDDEN, err.message);
            }
            if (!decoded) {
                throw new AppError(httpStatus.FORBIDDEN, "forbidden");
            }
            req.decoded = decoded as JwtPayload;
            const role = (decoded as JwtPayload).role as TUser_Role;
            if (requestedRole.length && !requestedRole.includes(role)) {
                throw new AppError(httpStatus.FORBIDDEN, "forbidden");
            }
        });
        next();
    });
}
