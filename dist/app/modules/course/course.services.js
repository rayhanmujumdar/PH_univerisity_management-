"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourseService = exports.removeCourseWithFacultyService = exports.assignCourseWithFacultyService = exports.updateCourseService = exports.getASingleCourseService = exports.getAllCourseService = exports.createCourseService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const error_1 = require("../../ErrorBoundary/error");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const course_constant_1 = require("./course.constant");
const course_model_1 = __importStar(require("./course.model"));
// create a course
const createCourseService = (payload) => {
    return course_model_1.default.create(payload);
};
exports.createCourseService = createCourseService;
// get all course
const getAllCourseService = (query) => {
    const course = new QueryBuilder_1.default(course_model_1.default.find().populate("preRequisiteCourse.course"), query)
        .search(course_constant_1.courseSearchFields)
        .limit()
        .skip()
        .sort()
        .fields();
    return course.modelQuery;
};
exports.getAllCourseService = getAllCourseService;
// get a single course
const getASingleCourseService = (id) => {
    return course_model_1.default.findById(id);
};
exports.getASingleCourseService = getASingleCourseService;
// update a single course
const updateCourseService = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { preRequisiteCourse } = payload, remainingFields = __rest(payload, ["preRequisiteCourse"]);
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        if (preRequisiteCourse && preRequisiteCourse.length > 0) {
            const deletedPreRequisite = preRequisiteCourse
                .filter((el) => {
                return el.course && el.isDeleted;
            })
                .map((el) => el.course);
            yield course_model_1.default.findByIdAndUpdate(id, {
                $pull: {
                    preRequisiteCourse: {
                        course: { $in: deletedPreRequisite },
                    },
                },
            }, {
                session,
                runValidators: true,
            });
            const newPreRequisite = preRequisiteCourse.filter((el) => el.course && !el.isDeleted);
            yield course_model_1.default.findByIdAndUpdate(id, {
                $addToSet: {
                    preRequisiteCourse: newPreRequisite,
                },
            }, { session, runValidators: true });
        }
        const updatedCourse = yield course_model_1.default.findByIdAndUpdate(id, remainingFields, { session, new: true, runValidators: true }).populate("preRequisiteCourse.course");
        yield session.commitTransaction();
        yield session.endSession();
        return updatedCourse;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new error_1.AppError(http_status_1.default.BAD_GATEWAY, "Failed to update course");
    }
});
exports.updateCourseService = updateCourseService;
// assign course faculty
const assignCourseWithFacultyService = (courseId, faculties) => {
    return course_model_1.CourseFaculty.findByIdAndUpdate(courseId, {
        course: courseId,
        $addToSet: { faculties: { $each: faculties } },
    }, {
        new: true,
        runValidators: true,
        upsert: true,
    });
};
exports.assignCourseWithFacultyService = assignCourseWithFacultyService;
// assign course faculty
const removeCourseWithFacultyService = (courseId, faculties) => {
    return course_model_1.CourseFaculty.findByIdAndUpdate(courseId, {
        $pull: { faculties: { $in: faculties } },
    }, {
        new: true,
        runValidators: true,
        projection: "-__v -_id",
    });
};
exports.removeCourseWithFacultyService = removeCourseWithFacultyService;
// delete course
const deleteCourseService = (id) => {
    return course_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
};
exports.deleteCourseService = deleteCourseService;
