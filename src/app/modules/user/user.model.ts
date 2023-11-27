import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

export const userSchema = new Schema<TUser>(
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

export const User = model<TUser>("User", userSchema);
