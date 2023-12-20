import { Model } from "mongoose";

export type TRole = "student" | "faculty" | "admin";
export type TUser = {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    status: "in-progress" | "block";
    isDeleted: boolean;
    role: TRole;
};

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface UserModel extends Model<TUser> {
    isPasswordMatch(
        plainPassword: string,
        hashPassword: string,
    ): Promise<boolean>;
}
