import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT || 4000,
    database_url: process.env.DATABASE_URL,
    default_password: process.env.DEFAULT_PASSWORD,
    salt_rounds: process.env.SALT_ROUNDS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_access_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,
    jwt_refresh_expire_in: process.env.JWT_REFRESH_EXPIRE_IN,
    reset_password_link: process.env.RESET_PASSWORD_LINK
};
