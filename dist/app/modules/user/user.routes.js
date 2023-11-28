"use strict";
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const checkValidation_1 = __importDefault(
    require("../../middleware/checkValidation"),
);
const student_validation_1 = require("../student/student.validation");
const router = express_1.default.Router();
// you can create a new student hit this route
router.post(
    "/create-student",
    (0, checkValidation_1.default)(
        student_validation_1.studentValidationSchema,
    ),
    user_controller_1.createStudentController,
);
exports.userRouter = router;
