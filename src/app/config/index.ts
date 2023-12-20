import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT || 4000,
    database_url: process.env.DATABASE_URL,
    default_password: process.env.DEFAULT_PASSWORD,
    salt_rounds: process.env.SALT_ROUNDS,
    jwt_secret: process.env.JWT_SECRET
};
