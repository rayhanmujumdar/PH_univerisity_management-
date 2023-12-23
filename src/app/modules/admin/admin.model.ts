import { Query, Schema, model } from "mongoose";
import { userNameSchema } from "../student/student.model";
import { TAdmin } from "./admin.interface";

export const adminSchema = new Schema<TAdmin>(
    {
        id: {
            type: String,
            required: [true, "id must be required"],
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: [true, "userId must be required"],
        },
        name: userNameSchema,
        age: {
            type: Number,
            required: [true, "age must be required"],
        },

        gender: {
            type: String,
            enum: ["male", "female", "other"],
            required: [true, "gender must be required"],
        },
        email: {
            type: String,
            required: [true, "email must be required"],
        },
        contactNo: {
            type: String,
            required: [true, "contactNo must be required"],
        },
        dateOfBirth: {
            type: String,
            required: [true, "dateOfBirth must be required"],
        },
        department: {
            type: String,
            required: [true, "department must be required"],
        },
        presentAddress: {
            type: String,
            required: [true, "presentAddress must be required"],
        },
        permanentAddress: {
            type: String,
            required: [true, "permanentAddress must be required"],
        },
        bloodGroup: {
            type: String,
            required: true,
            enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        },
        profileImg: String,
        emergencyContactNo: {
            type: String,
            required: [true, "emergencyContactNo must be required"],
        },
        designation: {
            type: String,
            required: [true, "designation must be required"],
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

// check deleted admin
adminSchema.pre(/^find/, function (this: Query<TAdmin, Document>, next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const Admin = model<TAdmin>("Admin", adminSchema);

export default Admin;
