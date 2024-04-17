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
exports.editCourseU = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const editCourseU = (courseId, instructorId, files, courseInfo, cloudService, courseDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    let isThumbnailUpdated = false, isGuideLinesUpdated = false;
    if (!courseId) {
        throw new appError_1.default('Please provide course id ', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (!instructorId) {
        throw new appError_1.default('Please provide instructor id ', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (!courseInfo) {
        throw new appError_1.default('Please provide course details', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const oldCourse = yield courseDbRepository.getCourseById(courseId);
    if (files && files.length > 0) {
        const uploadPromises = files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            if (file.mimetype === 'application/pdf') {
                const guidelines = yield cloudService.upload(file);
                courseInfo.guidelines = guidelines;
                isGuideLinesUpdated = true;
            }
            else {
                const thumbnail = yield cloudService.upload(file);
                courseInfo.thumbnail = thumbnail;
                isThumbnailUpdated = true;
            }
        }));
        yield Promise.all(uploadPromises);
    }
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
    const response = yield courseDbRepository.editCourse(courseId, courseInfo);
    if (response) {
        if (isGuideLinesUpdated && (oldCourse === null || oldCourse === void 0 ? void 0 : oldCourse.guidelines)) {
            yield cloudService.removeFile(oldCourse.guidelines.key);
        }
        if (isThumbnailUpdated && (oldCourse === null || oldCourse === void 0 ? void 0 : oldCourse.thumbnail)) {
            yield cloudService.removeFile(oldCourse.thumbnail.key);
        }
    }
});
exports.editCourseU = editCourseU;
