import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
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
        },
        needsPasswordChange: {
            type: Boolean,
            default: true,
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
            enum: ["in-progress", "block"],
            default: "in-progress",
        },
    },
    {
        timestamps: true,
    },
);

// password hashing before save in database
userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(config.salt_rounds),
    );
    next();
});

// password match static function
userSchema.statics.isPasswordMatch = async function (
    plainPassword: string,
    hashPassword: string,
) {
    return bcrypt.compare(plainPassword, hashPassword);
};

export const User = model<TUser, UserModel>("User", userSchema);
