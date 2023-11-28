"use strict";
var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next(),
            );
        });
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudentIntoDB = void 0;
const config_1 = __importDefault(require("../../config"));
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const createStudentIntoDB = (password, studentData) =>
    __awaiter(void 0, void 0, void 0, function* () {
        // create a new user
        const userData = {};
        userData.password = password
            ? password
            : config_1.default.default_password;
        userData.role = "student";
        // set manually generated id
        userData.id = "2030100031";
        // create a user
        const newUser = yield user_model_1.User.create(userData);
        if (Object.keys(newUser).length) {
            studentData.id = newUser.id;
            studentData.userId = newUser._id;
            const newStudent =
                yield student_model_1.Student.create(studentData);
            return newStudent;
        }
    });
exports.createStudentIntoDB = createStudentIntoDB;
