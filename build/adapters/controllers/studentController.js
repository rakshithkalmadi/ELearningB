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
const student_1 = require("../../app/usecases/student");
const studentManagement_1 = require("../../app/usecases/management/studentManagement");
const contact_1 = require("../../app/usecases/contact");
const studentController = (authServiceInterface, authServiceImpl, studentDbRepository, studentDbRepositoryImpl, contactDbRepository, contactDbRepositoryImpl, cloudServiceInterface, cloudServiceImpl, cacheDbRepository, cacheDbRepositoryImpl, cacheClient) => {
    const dbRepositoryStudent = studentDbRepository(studentDbRepositoryImpl());
    const dbRepositoryCache = cacheDbRepository(cacheDbRepositoryImpl(cacheClient));
    const dbRepositoryContact = contactDbRepository(contactDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    const cloudService = cloudServiceInterface(cloudServiceImpl());
    const changePassword = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const passwordInfo = req.body;
        const studentId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.Id;
        yield (0, student_1.changePasswordU)(studentId, passwordInfo, authService, dbRepositoryStudent);
        res.status(200).json({
            status: 'success',
            message: 'Successfully reset password',
            data: null
        });
    }));
    const updateProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const studentInfo = req.body;
        const studentId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.Id;
        const profilePic = req.file;
        yield (0, student_1.updateProfileU)(studentId, studentInfo, profilePic, cloudService, dbRepositoryStudent);
        yield dbRepositoryCache.clearCache(studentId !== null && studentId !== void 0 ? studentId : '');
        res.status(200).json({
            status: 'success',
            message: 'Successfully updated your profile',
            data: null
        });
    }));
    const getStudentDetails = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const studentId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.Id;
        const studentDetails = yield (0, student_1.getStudentDetailsU)(studentId, cloudService, dbRepositoryStudent);
        const cacheOptions = {
            key: `${studentId}`,
            expireTimeSec: 600,
            data: JSON.stringify(studentDetails)
        };
        yield dbRepositoryCache.setCache(cacheOptions);
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved student details',
            data: studentDetails
        });
    }));
    const getAllStudents = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const students = yield (0, studentManagement_1.getAllStudentsU)(cloudService, dbRepositoryStudent);
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved all student details',
            data: students
        });
    }));
    const blockStudent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const studentId = req.params.studentId;
        const reason = req.body.reason;
        yield (0, studentManagement_1.blockStudentU)(studentId, reason, dbRepositoryStudent);
        res.status(200).json({
            status: 'success',
            message: 'Successfully blocked student ',
            data: null
        });
    }));
    const unblockStudent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const studentId = req.params.studentId;
        yield (0, studentManagement_1.unblockStudentU)(studentId, dbRepositoryStudent);
        res.status(200).json({
            status: 'success',
            message: 'Successfully unblocked student ',
            data: null
        });
    }));
    const getAllBlockedStudents = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const students = yield (0, studentManagement_1.getAllBlockedStudentsU)(cloudService, dbRepositoryStudent);
        res.status(200).json({
            status: 'success',
            message: 'Successfully unblocked student ',
            data: students
        });
    }));
    const addContact = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const contactInfo = req.body;
        yield (0, contact_1.addContactU)(contactInfo, dbRepositoryContact);
        res.status(200).json({
            status: 'success',
            message: 'Successfully Submitted your response ',
            data: null
        });
    }));
    return {
        changePassword,
        updateProfile,
        getStudentDetails,
        blockStudent,
        unblockStudent,
        getAllStudents,
        getAllBlockedStudents,
        addContact
    };
};
exports.default = studentController;
