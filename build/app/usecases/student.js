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
exports.getStudentDetailsU = exports.updateProfileU = exports.changePasswordU = void 0;
const appError_1 = __importDefault(require("../../utils/appError"));
const HttpStatusCodes_1 = __importDefault(require("../../constants/HttpStatusCodes"));
const changePasswordU = (id, password, authService, studentDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        throw new appError_1.default('Invalid student', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (!password.currentPassword) {
        throw new appError_1.default('Please provide current password', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const student = yield studentDbRepository.getStudent(id);
    if (!student) {
        throw new appError_1.default('Unauthorized user', HttpStatusCodes_1.default.NOT_FOUND);
    }
    const isPasswordCorrect = yield authService.comparePassword(password.currentPassword, student === null || student === void 0 ? void 0 : student.password);
    if (!isPasswordCorrect) {
        throw new appError_1.default('Sorry, your current password is incorrect.', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (!password.newPassword) {
        throw new appError_1.default('new password cannot be empty', HttpStatusCodes_1.default.UNAUTHORIZED);
    }
    const hashedPassword = yield authService.hashPassword(password.newPassword);
    yield studentDbRepository.changePassword(id, hashedPassword);
});
exports.changePasswordU = changePasswordU;
const updateProfileU = (id, studentInfo, profilePic, cloudService, studentDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!id) {
        throw new appError_1.default('Invalid student', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (Object.keys(studentInfo).length === 0) {
        throw new appError_1.default('At least update a single field', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (profilePic) {
        const response = yield cloudService.upload(profilePic);
        studentInfo.profilePic = response;
    }
    yield studentDbRepository.updateProfile(id, studentInfo);
});
exports.updateProfileU = updateProfileU;
const getStudentDetailsU = (id, cloudService, studentDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (!id) {
        throw new appError_1.default('Please provide a valid student id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const studentDetails = yield studentDbRepository.getStudent(id);
    if ((_a = studentDetails === null || studentDetails === void 0 ? void 0 : studentDetails.profilePic) === null || _a === void 0 ? void 0 : _a.key) {
        studentDetails.profilePic.url = yield cloudService.getFile(studentDetails.profilePic.key);
    }
    if (studentDetails) {
        studentDetails.password = 'no password';
    }
    return studentDetails;
});
exports.getStudentDetailsU = getStudentDetailsU;
