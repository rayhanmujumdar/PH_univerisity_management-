import { Router } from "express";
import auth from "../../middleware/auth";
import checkValidation from "../../middleware/checkValidation";
import { USER_ROLE } from "../user/user.constant";
import {
    changePasswordController,
    forgetPasswordController,
    loginController,
    refreshTokenController,
} from "./auth.controller";
import {
    changePasswordValidationSchema,
    forgetPasswordValidationSchema,
    loginValidationSchema,
    refreshTokenValidationSchema,
    resetPasswordValidationSchema,
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

// change password route
authRouter.post(
    "/refresh-token",
    checkValidation(refreshTokenValidationSchema),
    refreshTokenController,
);

// forget password route
authRouter.get(
    "/forget-password",
    checkValidation(forgetPasswordValidationSchema),
    forgetPasswordController,
);

// reset password route
authRouter.post(
    "/reset-password",
    checkValidation(resetPasswordValidationSchema),
    forgetPasswordController,
);

export default authRouter;
