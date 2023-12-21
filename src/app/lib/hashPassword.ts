import bcrypt from "bcrypt";
import config from "../config";
const hashPassword = (plainTextPassword: string) => {
    return bcrypt.hashSync(plainTextPassword, Number(config.salt_rounds));
};

export default hashPassword;
