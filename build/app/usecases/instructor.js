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
exports.getStudentsForInstructorsU = exports.updateProfileU = exports.changePasswordU = void 0;
const appError_1 = __importDefault(require("../../utils/appError"));
const HttpStatusCodes_1 = __importDefault(require("../../constants/HttpStatusCodes"));
const changePasswordU = (id, password, authService, instructorDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        throw new appError_1.default('Invalid Instructor', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (!password.currentPassword) {
        throw new appError_1.default('Please provide current password', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const instructor = yield instructorDbRepository.getInstructorById(id);
    if (!instructor) {
        throw new appError_1.default('Unauthorized user', HttpStatusCodes_1.default.NOT_FOUND);
    }
    const isPasswordCorrect = yield authService.comparePassword(password.currentPassword, instructor === null || instructor === void 0 ? void 0 : instructor.password);
    if (!isPasswordCorrect) {
        throw new appError_1.default('Sorry, your current password is incorrect.', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (!password.newPassword) {
        throw new appError_1.default('new password cannot be empty', HttpStatusCodes_1.default.UNAUTHORIZED);
    }
    const hashedPassword = yield authService.hashPassword(password.newPassword);
    yield instructorDbRepository.changePassword(id, hashedPassword);
});
exports.changePasswordU = changePasswordU;
const updateProfileU = (id, instructorInfo, profilePic, cloudService, instructorDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        throw new appError_1.default('Invalid instructor', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (Object.keys(instructorInfo).length === 0) {
        throw new appError_1.default('At least update a single field', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (profilePic) {
        const response = yield cloudService.upload(profilePic);
        instructorInfo.profilePic = response;
    }
    yield instructorDbRepository.updateProfile(id, instructorInfo);
});
exports.updateProfileU = updateProfileU;
const getStudentsForInstructorsU = (instructorId, cloudService, courseDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!instructorId) {
        throw new appError_1.default('Please give a instructor id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const students = yield courseDbRepository.getStudentsByCourseForInstructor(instructorId);
    yield Promise.all(students.map((student) => __awaiter(void 0, void 0, void 0, function* () {
        if (student.profilePic.key) {
            student.profileUrl = "";
            student.profileUrl = yield cloudService.getFile(student.profilePic.key);
        }
    })));
    return students;
});
exports.getStudentsForInstructorsU = getStudentsForInstructorsU;
