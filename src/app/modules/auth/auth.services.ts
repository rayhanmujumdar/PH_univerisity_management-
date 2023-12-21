import httpStatus from "http-status";
import Jwt from "jsonwebtoken";
import { AppError } from "../../ErrorBoundary/error";
import config from "../../config";
import hashPassword from "../../lib/hashPassword";
import { User } from "../user/user.model";
import { TAuth, TDecodedUser } from "./auth.interface";
import { TChangePassword } from "./auth.validation";

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
    const token = await Jwt.sign(jwtPayload, config.jwt_secret as string, {
        expiresIn: "10d",
    });
    return {
        accessToken: token,
        needsPasswordChanged: user.needsPasswordChange,
    };
};

export const changePasswordService = async (
    user: TDecodedUser,
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
