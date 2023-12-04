import { Schema, model } from "mongoose";
import error from "../../ErrorBoundary/error";
import { TAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
    {
        name: {
            type: String,
            required: [true, "name must be required"],
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

// check academic department name before save
academicDepartmentSchema.pre("save", async function (next) {
    const isExistName = await AcademicDepartment.findOne({ name: this.name });
    if (isExistName) {
        next(error(500, "This department are already exist"));
    }
    next();
});

// academic department exist in database checking
academicDepartmentSchema.pre("findOneAndUpdate", async function (next) {
    const query = this.getQuery();
    const isDepartmentExist = await this.model.findById(query);
    if (!isDepartmentExist) {
        next(error(500, "Academic Department does not exist"));
    }
    next();
});

const AcademicDepartment = model<TAcademicDepartment>(
    "AcademicDepartment",
    academicDepartmentSchema,
);

export default AcademicDepartment;
