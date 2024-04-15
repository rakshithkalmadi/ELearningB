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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const instructorManagement_1 = require("../../app/usecases/management/instructorManagement");
const instructor_1 = require("../../app/usecases/instructor");
const instructorController = (authServiceInterface, authServiceImpl, instructorDbRepository, instructorDbRepositoryImpl, courseDbRepository, courseDbRepositoryImpl, emailServiceInterface, emailServiceImpl, cloudServiceInterface, cloudServiceImpl) => {
    const authService = authServiceInterface(authServiceImpl());
    const dbRepositoryInstructor = instructorDbRepository(instructorDbRepositoryImpl());
    const dbRepositoryCourse = courseDbRepository(courseDbRepositoryImpl());
    const emailService = emailServiceInterface(emailServiceImpl());
    const cloudService = cloudServiceInterface(cloudServiceImpl());
    //? INSTRUCTOR MANAGEMENT
    const getInstructorRequests = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, instructorManagement_1.getAllInstructorRequests)(dbRepositoryInstructor);
        res.json({
            status: 'success',
            message: 'Successfully retrieved all instructor requests',
            data: response
        });
    }));
    const verifyInstructor = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const instructorId = req.params.instructorId;
        const response = yield (0, instructorManagement_1.acceptInstructorRequest)(instructorId, dbRepositoryInstructor, emailService);
        res.json({
            status: 'success',
            message: 'Successfully accepted instructor request',
            data: response
        });
    }));
    const rejectRequest = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { instructorId, reason } = req.body;
        const response = yield (0, instructorManagement_1.rejectInstructorRequest)(instructorId, reason, dbRepositoryInstructor, emailService);
        res.json({
            status: 'success',
            message: 'Successfully rejected instructor request',
            data: response
        });
    }));
    const getAllInstructor = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const instructors = yield (0, instructorManagement_1.getAllInstructors)(cloudService, dbRepositoryInstructor);
        res.json({
            status: 'success',
            message: 'Successfully fetched all instructor information',
            data: instructors
        });
    }));
    const blockInstructor = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { instructorId, reason } = req.body;
        const response = yield (0, instructorManagement_1.blockInstructors)(instructorId, reason, dbRepositoryInstructor);
        res.json({
            status: 'success',
            message: 'Successfully blocked the instructor',
            data: response
        });
    }));
    const unblockInstructor = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const instructorId = req.params.instructorId;
        const response = yield (0, instructorManagement_1.unblockInstructors)(instructorId, dbRepositoryInstructor);
        res.json({
            status: 'success',
            message: 'Successfully unblocked the instructor',
            data: response
        });
    }));
    const getBlockedInstructor = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, instructorManagement_1.getBlockedInstructors)(cloudService, dbRepositoryInstructor);
        res.json({
            status: 'success',
            message: 'Successfully fetched blocked instructors',
            data: response
        });
    }));
    const getInstructorById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let instructorId = req.params.instructorId;
        const response = yield (0, instructorManagement_1.getInstructorByIdUseCase)(instructorId, cloudService, dbRepositoryInstructor);
        res.json({
            status: 'success',
            message: 'Successfully fetched instructor info',
            data: response
        });
    }));
    const updateProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const instructorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.Id;
        const instructorInfo = req.body;
        const profilePic = req.file;
        yield (0, instructor_1.updateProfileU)(instructorId, instructorInfo, profilePic, cloudService, dbRepositoryInstructor);
        res.json({
            status: 'success',
            message: 'Successfully updated profile',
            data: null
        });
    }));
    const changePassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const passwordInfo = req.body;
        const instructorId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.Id;
        yield (0, instructor_1.changePasswordU)(instructorId, passwordInfo, authService, dbRepositoryInstructor);
        res.status(200).json({
            status: 'success',
            message: 'Successfully reset password',
            data: null
        });
    }));
    const getStudentsForInstructors = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const instructorId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.Id;
        const students = yield (0, instructor_1.getStudentsForInstructorsU)(instructorId, cloudService, dbRepositoryCourse);
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved all students',
            data: students
        });
    }));
    const getInstructorDetails = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
        const instructorId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.Id;
        const instructor = yield (0, instructorManagement_1.getInstructorByIdUseCase)(instructorId !== null && instructorId !== void 0 ? instructorId : '', cloudService, dbRepositoryInstructor);
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved instructor details...',
            data: instructor
        });
    }));
    return {
        getInstructorRequests,
        verifyInstructor,
        rejectRequest,
        getAllInstructor,
        blockInstructor,
        unblockInstructor,
        getBlockedInstructor,
        getInstructorById,
        updateProfile,
        changePassword,
        getStudentsForInstructors,
        getInstructorDetails
    };
};
exports.default = instructorController;
