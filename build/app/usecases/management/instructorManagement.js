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
exports.getInstructorByIdUseCase = exports.getBlockedInstructors = exports.unblockInstructors = exports.blockInstructors = exports.getAllInstructors = exports.rejectInstructorRequest = exports.acceptInstructorRequest = exports.getAllInstructorRequests = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const getAllInstructorRequests = (instructorRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const allRequests = yield instructorRepository.getInstructorRequests();
    if (allRequests.length === 0) {
        return null;
    }
    return allRequests;
});
exports.getAllInstructorRequests = getAllInstructorRequests;
const acceptInstructorRequest = (instructorId, instructorRepository, emailService) => __awaiter(void 0, void 0, void 0, function* () {
    if (!instructorId) {
        throw new appError_1.default('Invalid instructor id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const response = yield instructorRepository.acceptInstructorRequest(instructorId);
    if (response) {
        emailService.sendEmail(response.email, 'Successfully verified your profile', 'You are verified');
    }
    return response;
});
exports.acceptInstructorRequest = acceptInstructorRequest;
const rejectInstructorRequest = (instructorId, reason, instructorRepository, emailService) => __awaiter(void 0, void 0, void 0, function* () {
    if (!instructorId || !reason) {
        throw new appError_1.default('InstructorId or reason cannot be empty', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const rejected = yield instructorRepository.checkRejected(instructorId);
    if (rejected) {
        throw new appError_1.default('Already rejected this request', HttpStatusCodes_1.default.CONFLICT);
    }
    const response = yield instructorRepository.rejectInstructorRequest(instructorId, reason);
    if (response) {
        emailService.sendEmail(response.email, 'Sorry your request is rejected', reason);
    }
    return response;
});
exports.rejectInstructorRequest = rejectInstructorRequest;
const getAllInstructors = (cloudService, instructorRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const instructors = yield instructorRepository.getAllInstructors();
    yield Promise.all(instructors.map((instructor) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        if (instructor.profilePic) {
            instructor.profileUrl = yield cloudService.getFile((_a = instructor.profilePic.key) !== null && _a !== void 0 ? _a : '');
        }
    })));
    return instructors;
});
exports.getAllInstructors = getAllInstructors;
const blockInstructors = (instructorId, reason, instructorRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!instructorId || !reason) {
        throw new appError_1.default('Please provide instructor id and reason', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const response = yield instructorRepository.blockInstructors(instructorId, reason);
    return response;
});
exports.blockInstructors = blockInstructors;
const unblockInstructors = (instructorId, instructorRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!instructorId) {
        throw new appError_1.default('Invalid instructor id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const response = yield instructorRepository.unblockInstructors(instructorId);
    return response;
});
exports.unblockInstructors = unblockInstructors;
const getBlockedInstructors = (cloudService, instructorRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const blockedInstructors = yield instructorRepository.getBlockedInstructors();
    yield Promise.all(blockedInstructors.map((instructor) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        if (instructor.profilePic) {
            instructor.profileUrl = yield cloudService.getFile((_b = instructor.profilePic.key) !== null && _b !== void 0 ? _b : '');
        }
    })));
    return blockedInstructors;
});
exports.getBlockedInstructors = getBlockedInstructors;
const getInstructorByIdUseCase = (instructorId, cloudService, instructorRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!instructorId) {
        throw new appError_1.default('Invalid instructor id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const instructor = yield instructorRepository.getInstructorById(instructorId);
    if (instructor === null || instructor === void 0 ? void 0 : instructor.profilePic.key) {
        const profilePic = yield cloudService.getFile(instructor === null || instructor === void 0 ? void 0 : instructor.profilePic.key);
        instructor.profileUrl = profilePic;
    }
    if (instructor) {
        instructor.password = 'no password';
    }
    return instructor;
});
exports.getInstructorByIdUseCase = getInstructorByIdUseCase;
