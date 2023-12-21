import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../ErrorBoundary/error";
import config from "../config";
import catchAsync from "../lib/catchAsync";
import { TUser_Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";
export default function auth(...requestedRole: TUser_Role[]) {
    return catchAsync(async (req, _res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            throw new AppError(httpStatus.FORBIDDEN, "forbidden");
        }
        const decoded = jwt.verify(
            token,
            config.jwt_secret as string,
        ) as JwtPayload;
        const { userId, role, iat } = decoded;
        if (!decoded) {
            throw new AppError(httpStatus.FORBIDDEN, "forbidden");
        }
        const user = await User.isUserExistByCustomId(userId);
        if (!user) {
            throw new AppError(httpStatus.NOT_FOUND, "this user is not found!");
        }
        if (
            user.passwordChangedAt &&
            User.isJwtIssuesAfterChangePassword(
                user.passwordChangedAt,
                iat as number,
            )
        ) {
            throw new AppError(
                httpStatus.NOT_FOUND,
                "Your login token expire! please login",
            );
        }
        req.decoded = decoded as JwtPayload;
        if (requestedRole.length && !requestedRole.includes(role)) {
            throw new AppError(httpStatus.FORBIDDEN, "forbidden");
        }
        next();
    });
}
