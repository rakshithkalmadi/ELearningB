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
exports.getTrendingCourseU = exports.getRecommendedCourseByStudentU = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const getRecommendedCourseByStudentU = (studentId, cloudService, courseDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!studentId) {
        throw new appError_1.default('Please provide a valid student id ', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const courses = yield courseDbRepository.getRecommendedCourseByStudentInterest(studentId);
    yield Promise.all(courses.map((course) => __awaiter(void 0, void 0, void 0, function* () {
        course.media = { thumbnailUrl: "", profileUrl: "" };
        if (course.course) {
            course.media.thumbnailUrl = yield cloudService.getFile(course.course.thumbnailKey);
        }
        if (course.instructor) {
            course.media.profileUrl = yield cloudService.getFile(course.instructor.profileKey);
        }
    })));
    return courses;
});
exports.getRecommendedCourseByStudentU = getRecommendedCourseByStudentU;
const getTrendingCourseU = (cloudService, courseDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const courses = yield courseDbRepository.getTrendingCourse();
    yield Promise.all(courses.map((course) => __awaiter(void 0, void 0, void 0, function* () {
        if (course.thumbnail) {
            course.thumbnailUrl = yield cloudService.getFile(course.thumbnail.key);
        }
        if (course.instructorProfile) {
            course.profileUrl = yield cloudService.getFile(course.instructorProfile.key);
        }
    })));
    return courses;
});
exports.getTrendingCourseU = getTrendingCourseU;
