export type TRole = "student" | "faculty" | "admin";
export type TUser = {
    id: string;
    password: string;
    needsPasswordChange: boolean;
    status: "in-progress" | "block";
    isDeleted: boolean;
    role: TRole;
};
