import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
    {
        name: {
            type: String,
            required: [true, "name must be required"],
            unique: true,
        },

        academicFacultyId: {
            type: Schema.Types.ObjectId,
            ref: "AcademicFaculty",
            required: [true, "academicFacultyId are required"],
        },
    },
    {
        timestamps: true,
    },
);

const AcademicDepartment = model<TAcademicDepartment>(
    "AcademicDepartment",
    academicDepartmentSchema,
);

export default AcademicDepartment;
