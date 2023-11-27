export type TUser = {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    status: "in-progress" | "block";
    isDeleted: boolean;
    role: "student" | "faculty" | "admin";
};
