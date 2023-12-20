import httpStatus from "http-status";
import { AppError } from "../../ErrorBoundary/error";
import { User } from "../user/user.model";
import { TAuth } from "./auth.interface";

export const logInService = async (payload: TAuth) => {
    const isUserExist = await User.findOne({ id: payload.id });
    if (!isUserExist) {
        throw new AppError(httpStatus.FORBIDDEN, "User not found");
    }
    // check your status
    const userStatus = isUserExist.status;
    if (userStatus === "block") {
        throw new AppError(httpStatus.FORBIDDEN, "User was Blocked");
    }
    // check user is deleted
    const isDeletedUser = isUserExist.isDeleted;
    if (isDeletedUser) {
        throw new AppError(httpStatus.FORBIDDEN, "This user was deleted");
    }
    // check password matched
    const existingHashPassword = isUserExist.password;
    const isPasswordMatch = await User.isPasswordMatch(
        payload.password,
        existingHashPassword,
    );
    if (!isPasswordMatch) {
        throw new AppError(httpStatus.FORBIDDEN, "Password doesn't match");
    }
    return payload;
};
