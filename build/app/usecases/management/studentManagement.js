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
exports.getAllBlockedStudentsU = exports.unblockStudentU = exports.blockStudentU = exports.getAllStudentsU = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const getAllStudentsU = (cloudService, studentRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield studentRepository.getAllStudents();
    yield Promise.all(students.map((student) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if ((_a = student === null || student === void 0 ? void 0 : student.profilePic) === null || _a === void 0 ? void 0 : _a.key) {
            student.profileUrl = "";
            student.profileUrl = yield cloudService.getFile(student.profilePic.key);
        }
    })));
    return students;
});
exports.getAllStudentsU = getAllStudentsU;
const blockStudentU = (studentId, reason, studentRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!studentId) {
        throw new appError_1.default('Invalid student details', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (!reason) {
        throw new appError_1.default('Please give a reason to block a student', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const student = yield studentRepository.getStudent(studentId);
    if (student === null || student === void 0 ? void 0 : student.isBlocked) {
        throw new appError_1.default('Already blocked this student', HttpStatusCodes_1.default.CONFLICT);
    }
    yield studentRepository.blockStudent(studentId, reason);
});
exports.blockStudentU = blockStudentU;
const unblockStudentU = (studentId, studentRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!studentId) {
        throw new appError_1.default('Invalid student details', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    yield studentRepository.unblockStudent(studentId);
});
exports.unblockStudentU = unblockStudentU;
const getAllBlockedStudentsU = (cloudService, studentRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const blockedStudents = yield studentRepository.getAllBlockedStudents();
    yield Promise.all(blockedStudents.map((student) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        if ((_b = student === null || student === void 0 ? void 0 : student.profilePic) === null || _b === void 0 ? void 0 : _b.key) {
            student.profileUrl = "";
            student.profileUrl = yield cloudService.getFile(student.profilePic.key);
        }
    })));
    return blockedStudents;
});
exports.getAllBlockedStudentsU = getAllBlockedStudentsU;
