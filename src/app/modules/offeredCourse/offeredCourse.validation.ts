import { z } from "zod";
import { Days } from "./offeredCourse.constant";

const timeValidation = z
    .string({
        required_error: "endTime must be required",
    })
    .refine(
        (time) => {
            const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
            return regex.test(time);
        },
        {
            message: "Invalid endTime, your time format must be HH:MM type",
        },
    );

export const createOfferedCourseValidationSchema = z.object({
    body: z
        .object({
            semesterRegistration: z.string({
                required_error: "semesterRegistration must be required",
            }),
            academicSemester: z.string({
                required_error: "academicSemester must be required",
            }),
            academicFaculty: z.string({
                required_error: "academicSemester must be required",
            }),
            academicDepartment: z.string({
                required_error: "academicDepartment must be required",
            }),
            faculty: z.string({
                required_error: "faculty must be required",
            }),
            course: z.string({
                required_error: "course must be required",
            }),
            maxCapacity: z.number({
                required_error: "maxCapacity must be required",
            }),
            section: z.number({ required_error: "section must be required" }),
            days: z.enum([...Days] as [string, ...string[]]),
            startTime: timeValidation,
            endTime: timeValidation,
        })
        .refine(
            (body) => {
                const start = new Date(`1970-01-01T${body.startTime}:00`);
                const end = new Date(`1970-01-01T${body.endTime}:00`);
                return end > start;
            },
            {
                message: "start time should be before end time!",
            },
        ),
});

export const updateOfferedCourseValidationSchema = z.object({
    body: z
        .object({
            faculty: z.string({
                required_error: "faculty must be required",
            }),
            maxCapacity: z.number({
                required_error: "maxCapacity must be required",
            }),
            days: z.enum([...Days] as [string, ...string[]]).optional(),
            startTime: timeValidation,
            endTime: timeValidation,
        })
        .refine(
            (body) => {
                const start = new Date(`1970-01-01T${body.startTime}:00`);
                const end = new Date(`1970-01-01T${body.endTime}:00`);
                return end > start;
            },
            {
                message: "start time should be before end time!",
            },
        ),
});
