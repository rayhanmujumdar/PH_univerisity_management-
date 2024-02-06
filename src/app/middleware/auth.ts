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
            throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorize");
        }
        let decoded;
        try {
            decoded = jwt.verify(
                token,
                config.jwt_access_secret as string,
            ) as JwtPayload;
        } catch (err) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorize");
        }
        const { userId, role, iat } = decoded;
        if (!decoded) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorize");
        }
        const user = await User.isUserExistByCustomId(userId);
        if (!user) {
            throw new AppError(httpStatus.FORBIDDEN, "this user is not found!");
        }

        const isDeleted = user.isDeleted;
        if (isDeleted) {
            throw new AppError(
                httpStatus.EXPECTATION_FAILED,
                "User was deleted",
            );
        }
        const status = user.status;
        if (status === "block") {
            throw new AppError(httpStatus.CONFLICT, "Blocked user");
        }
        if (
            user.passwordChangedAt &&
            User.isJwtIssuesAfterChangePassword(
                user.passwordChangedAt,
                iat as number,
            )
        ) {
            throw new AppError(
                httpStatus.FORBIDDEN,
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
