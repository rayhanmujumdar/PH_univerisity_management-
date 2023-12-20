import { Router } from "express";
import checkValidation from "../../middleware/checkValidation";
import { loginController } from "./auth.controller";
import { loginValidationSchema } from "./auth.validation";

const authRouter = Router();

authRouter.post(
    "/login",
    checkValidation(loginValidationSchema),
    loginController,
);

export default authRouter;
