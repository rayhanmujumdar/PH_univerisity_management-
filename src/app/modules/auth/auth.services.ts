import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../../ErrorBoundary/error";
import config from "../../config";
import hashPassword from "../../lib/hashPassword";
import sendEmail from "../../lib/sendEmail";
import { User } from "../user/user.model";
import { TAuth, TResetPassword } from "./auth.interface";
import { jwtTokenGenerator } from "./auth.utils";
import { TChangePassword } from "./auth.validation";
// login service
export const logInService = async (payload: TAuth) => {
    const user = await User.isUserExistByCustomId(payload.id);
    if (!user) {
        throw new AppError(httpStatus.FORBIDDEN, "User not found");
    }
    // check your status
    const userStatus = user.status;
    if (userStatus === "block") {
        throw new AppError(httpStatus.FORBIDDEN, "User was Blocked");
    }
    // check user is deleted
    const isDeletedUser = user.isDeleted;
    if (isDeletedUser) {
        throw new AppError(httpStatus.FORBIDDEN, "This user was deleted");
    }
    // check password matched
    const existingHashPassword = user.password;
    const isPasswordMatch = await User.isPasswordMatch(
        payload.password,
        existingHashPassword,
    );
    if (!isPasswordMatch) {
        throw new AppError(httpStatus.FORBIDDEN, "Password doesn't match");
    }
    // send to client a json web token
    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    const accessToken = jwtTokenGenerator(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expire_in as string,
    );
    const refreshToken = jwtTokenGenerator(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expire_in as string,
    );
    return {
        accessToken,
        refreshToken,
        needsPasswordChanged: user.needsPasswordChange,
    };
};

// change password service
export const changePasswordService = async (
    user: JwtPayload,
    payload: TChangePassword,
) => {
    // check old password or existing password are same
    const existingUserPassword = await User.isUserExistByCustomId(user.userId);
    if (
        !(await User.isPasswordMatch(
            payload.oldPassword,
            existingUserPassword?.password as string,
        ))
    ) {
        throw new AppError(
            httpStatus.BAD_REQUEST,
            "your old password is not valid",
        );
    }
    // hash new password
    const hashedPassword = hashPassword(payload.password);
    await User.findOneAndUpdate(
        {
            id: user.userId,
            role: user.role,
        },
        {
            password: hashedPassword,
            needsPasswordChange: false,
            passwordChangedAt: new Date(),
        },
    );
    return null;
};

// refresh token service
export const refreshTokenService = async (token: string) => {
    if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorize");
    }
    const decoded = jwt.verify(
        token,
        config.jwt_refresh_secret as string,
    ) as JwtPayload;
    const { userId, iat } = decoded;
    if (!decoded) {
        throw new AppError(httpStatus.UNAUTHORIZED, "forbidden");
    }
    const user = await User.isUserExistByCustomId(userId);
    const { status, isDeleted } = user;
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "this user is not found!");
    }
    if (isDeleted) {
        throw new AppError(httpStatus.EXPECTATION_FAILED, "User was deleted");
    }
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
    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    const accessToken = jwtTokenGenerator(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expire_in as string,
    );
    return accessToken;
};

// forget password service
export const forgetPasswordService = async (userId: string) => {
    const user = await User.isUserExistByCustomId(userId);
    const { status, isDeleted } = user;
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "this user is not found!");
    }
    if (isDeleted) {
        throw new AppError(httpStatus.EXPECTATION_FAILED, "User was deleted");
    }
    if (status === "block") {
        throw new AppError(httpStatus.CONFLICT, "Blocked user");
    }
    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    const resetToken = jwtTokenGenerator(
        jwtPayload,
        config.jwt_access_secret as string,
        "10m",
    );
    const resetPasswordLink = `${config.reset_password_link}?id=${userId}&token=${resetToken}`;
    await sendEmail(user.email, resetPasswordLink);
};
export const resetPasswordService = async (
    token: string,
    payload: TResetPassword,
) => {
    const user = await User.isUserExistByCustomId(payload.id);
    if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "unauthorize");
    }
    const { status, isDeleted } = user;
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "this user is not found!");
    }
    if (isDeleted) {
        throw new AppError(httpStatus.EXPECTATION_FAILED, "User was deleted");
    }
    if (status === "block") {
        throw new AppError(httpStatus.CONFLICT, "Blocked user");
    }
    const decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
    ) as JwtPayload;
    if (decoded.id !== payload.id) {
        throw new AppError(httpStatus.UNAUTHORIZED, "unauthorize");
    }
    const hashNewPassword = hashPassword(payload.newPassword);
    await User.findOneAndUpdate(
        { id: decoded.id, role: decoded.role },
        {
            password: hashNewPassword,
            needsPasswordChange: false,
            passwordCreatedAt: new Date(),
        },
    );
    return;
};
