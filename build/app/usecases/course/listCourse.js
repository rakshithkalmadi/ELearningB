"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourseByStudentU = exports.getCourseByIdU = exports.getAllCourseU = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const getAllCourseU = (cloudService, courseDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield courseDbRepository.getAllCourse();
    yield Promise.all(courses.map((course) => __awaiter(void 0, void 0, void 0, function* () {
        if (course.thumbnail) {
            course.thumbnailUrl = yield cloudService.getFile(course.thumbnail.key);
        }
    })));
    return courses;
});
exports.getAllCourseU = getAllCourseU;
const getCourseByIdU = (courseId, cloudService, courseDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!courseId) {
        throw new appError_1.default('Please provide a course id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const course = yield courseDbRepository.getCourseById(courseId);
    // if(course){
    //   course.introductionUrl=" "
    // }
    if (course) {
        if (course.thumbnail) {
            const thumbnail = yield cloudService.getFile(course.thumbnail.key);
            course.thumbnailUrl = thumbnail;
        }
        if (course.guidelines) {
            const guidelines = yield cloudService.getFile(course.guidelines.key);
            course.guidelinesUrl = guidelines;
        }
        // if(course.introduction){
        //   const introduction = await cloudService.getFile(course.introduction.key)
        //   console.log(introduction)
        //   course.introductionUrl = introduction
        // }
    }
    return course;
});
exports.getCourseByIdU = getCourseByIdU;
const getCourseByStudentU = (studentId, cloudService, courseDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!studentId) {
        throw new appError_1.default('Invalid student id ', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const courses = yield courseDbRepository.getCourseByStudent(studentId);
    yield Promise.all(courses.map((course) => __awaiter(void 0, void 0, void 0, function* () {
        if (course.thumbnail) {
            course.thumbnailUrl = yield cloudService.getFile(course.thumbnail.key);
        }
    })));
    return courses;
});
exports.getCourseByStudentU = getCourseByStudentU;
