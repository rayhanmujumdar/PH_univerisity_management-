import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import hashPassword from "../../lib/hashPassword";
import { userStatus } from "./user.constant";
import { TUser, UserModel } from "./user.interface";

export const userSchema = new Schema<TUser, UserModel>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: 0,
        },
        needsPasswordChange: {
            type: Boolean,
            default: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordChangedAt: {
            type: Date,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: ["student", "faculty", "admin"],
            default: "student",
        },
        status: {
            type: String,
            enum: userStatus,
            default: "in-progress",
        },
    },
    {
        timestamps: true,
    },
);

// password hashing before save in database
userSchema.pre("save", async function (next) {
    this.password = hashPassword(this.password);
    next();
});

// password match static function
userSchema.statics.isPasswordMatch = async function (
    plainPassword: string,
    hashPassword: string,
) {
    return bcrypt.compare(plainPassword, hashPassword);
};

// user existing check static method
userSchema.statics.isUserExistByCustomId = function (id: string) {
    return this.findOne({
        id,
    }).select("+password");
};

// jwt time issues check
userSchema.statics.isJwtIssuesAfterChangePassword = function (
    passwordChangedTime,
    jwtTokenIssuesTime,
) {
    const passwordChangeTimeConvertedDateTime =
        new Date(passwordChangedTime).getTime() / 1000;
    return passwordChangeTimeConvertedDateTime > jwtTokenIssuesTime;
};

export const User = model<TUser, UserModel>("User", userSchema);
