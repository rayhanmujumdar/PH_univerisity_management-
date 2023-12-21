import { Router } from "express";
import auth from "../../middleware/auth";
import checkValidation from "../../middleware/checkValidation";
import { USER_ROLE } from "../user/user.constant";
import { changePasswordController, loginController } from "./auth.controller";
import {
    changePasswordValidationSchema,
    loginValidationSchema,
} from "./auth.validation";

const authRouter = Router();

// login with id or password
authRouter.post(
    "/login",
    checkValidation(loginValidationSchema),
    loginController,
);

// change password route
authRouter.patch(
    "/change-password",
    auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    checkValidation(changePasswordValidationSchema),
    changePasswordController,
);

export default authRouter;
