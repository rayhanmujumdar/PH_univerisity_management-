import { Schema, model } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";

const academicFacultySchema = new Schema<TAcademicFaculty>(
    {
        name: {
            type: String,
            required: [true, "name must be required"],
        },
    },
    {
        timestamps: true,
    },
);

const AcademicFaculty = model<TAcademicFaculty>(
    "AcademicFaculty",
    academicFacultySchema,
);

export default AcademicFaculty;
