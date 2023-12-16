import { Schema, model } from "mongoose";
import { semesterRegistrationStatus } from "./semesterRegistration.constant";
import { TSemesterRegistration } from "./semesterRegistration.interface";

export const semesterRegistration = new Schema<TSemesterRegistration>({
    academicSemester: {
        type: Schema.Types.ObjectId,
        ref: "AcademicSemester",
        unique: true,
        required: true,
    },
    status: {
        type: String,
        enum: {
            values: semesterRegistrationStatus,
            message: "{VALUE} is not valid status",
        },
        default: "UPCOMING",
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    minCredit: {
        type: Number,
        default: 3,
        min: [3, "minimum three credits required"],
    },
    maxCredit: {
        type: Number,
        max: [16, "maximum you provide 16 credits"],
    },
});

const SemesterRegistration = model(
    "SemesterRegistration",
    semesterRegistration,
);

export default SemesterRegistration;
