import { TSchedule } from "./offeredCourse.interface";
export const hasScheduleTimeConflict = (
    assignedSchedule: TSchedule[],
    newSchedule: TSchedule,
) => {
    // 11.30 - 1.30 -> that is this current class time -> existing time
    // 12.30 - 2.30 -> that is not valid class time because you have already class -> new time
    for (const schedule of assignedSchedule) {
        const existingStartTime = new Date(
            `1970-01-01T${schedule.startTime}:00`,
        );
        const existingEndTime = new Date(`1970-01-01T${schedule.endTime}:00`);
        const newStartTime = new Date(`1970-01-01T${newSchedule.startTime}:00`);
        const newEndTime = new Date(`1970-01-01T${newSchedule.endTime}:00`);
        if (newStartTime < existingEndTime && newEndTime > existingStartTime) {
            return true;
        }
    }
    return false;
};
