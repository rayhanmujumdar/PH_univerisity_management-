export type TAuth = {
    id: string;
    password: string;
};

export type TDecodedUser = {
    userId: string;
    role: string;
};

export type TResetPassword = {
    id: string;
    newPassword: string
}