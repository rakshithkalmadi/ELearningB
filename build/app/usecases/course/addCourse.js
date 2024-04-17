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
exports.addCourses = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const addCourses = (instructorId, courseInfo, files, cloudService, courseDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!instructorId || !courseInfo || !files || files.length === 0) {
        throw new appError_1.default('Invalid input data', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    console.log(files);
    const uploadPromises = files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
        let uploadedFile;
        if (file.mimetype === 'application/pdf') {
            uploadedFile = yield cloudService.upload(file);
            courseInfo.guidelines = uploadedFile;
        }
        if (file.mimetype === 'video/mp4') {
            uploadedFile = yield cloudService.upload(file);
            courseInfo.introduction = uploadedFile;
        }
        if (file.mimetype.includes('image')) {
            uploadedFile = yield cloudService.upload(file);
            courseInfo.thumbnail = uploadedFile;
        }
    }));
    yield Promise.all(uploadPromises);
    courseInfo.instructorId = instructorId;
    if (typeof courseInfo.tags === 'string') {
        courseInfo.tags = courseInfo.tags.split(',');
    }
    if (typeof courseInfo.syllabus === 'string') {
        courseInfo.syllabus = courseInfo.syllabus.split(',');
    }
    if (typeof courseInfo.requirements === 'string') {
        courseInfo.requirements = courseInfo.requirements.split(',');
    }
    console.log(courseInfo);
    const courseId = yield courseDbRepository.addCourse(courseInfo);
    if (!courseId) {
        throw new appError_1.default('Unable to add course', HttpStatusCodes_1.default.INTERNAL_SERVER_ERROR);
    }
    return courseId;
});
exports.addCourses = addCourses;
