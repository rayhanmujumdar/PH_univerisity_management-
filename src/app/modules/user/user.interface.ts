import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export type TRole = "student" | "faculty" | "admin";
export type TUser = {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    email: string;
    passwordChangedAt?: Date;
    status: "in-progress" | "block";
    isDeleted: boolean;
    role: TRole;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface UserModel extends Model<TUser> {
    isUserExistByCustomId(id: string): Promise<TUser>;
    isPasswordMatch(
        plainPassword: string,
        hashPassword: string,
    ): Promise<boolean>;
    isJwtIssuesAfterChangePassword(
        passwordChangedTime: Date,
        jwtTokenIssuesTime: number,
    ): boolean;
}

export type TUser_Role = keyof typeof USER_ROLE;
