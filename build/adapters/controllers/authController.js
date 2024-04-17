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
const studentAuth_1 = require("../../app/usecases/auth/studentAuth");
const instructorAuth_1 = require("../../app/usecases/auth/instructorAuth");
const adminAuth_1 = require("../../app/usecases/auth/adminAuth");
const authController = (authServiceInterface, authServiceImpl, cloudServiceInterface, CloudServiceImpl, studentDbRepository, studentDbRepositoryImpl, instructorDbRepository, instructorDbRepositoryImpl, googleAuthServiceInterface, googleAuthServiceImpl, adminDbRepository, adminDbRepositoryImpl, refreshTokenDbRepository, refreshTokenDbRepositoryImpl) => {
    const dbRepositoryUser = studentDbRepository(studentDbRepositoryImpl());
    const dbRepositoryInstructor = instructorDbRepository(instructorDbRepositoryImpl());
    const dbRepositoryAdmin = adminDbRepository(adminDbRepositoryImpl());
    const dbRepositoryRefreshToken = refreshTokenDbRepository(refreshTokenDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    const cloudService = cloudServiceInterface(CloudServiceImpl());
    const googleAuthService = googleAuthServiceInterface(googleAuthServiceImpl());
    //? STUDENT
    const registerStudent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const student = req.body;
        const { accessToken, refreshToken } = yield (0, studentAuth_1.studentRegister)(student, dbRepositoryUser, dbRepositoryRefreshToken, authService);
        res.status(200).json({
            status: 'success',
            message: 'Successfully registered the user',
            accessToken,
            refreshToken
        });
    }));
    const loginStudent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const { accessToken, refreshToken } = yield (0, studentAuth_1.studentLogin)(email, password, dbRepositoryUser, dbRepositoryRefreshToken, authService);
        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            accessToken,
            refreshToken
        });
    }));
    const loginWithGoogle = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { credential } = req.body;
        const { accessToken, refreshToken } = yield (0, studentAuth_1.signInWithGoogle)(credential, googleAuthService, dbRepositoryUser, dbRepositoryRefreshToken, authService);
        res.status(200).json({
            status: 'success',
            message: 'Successfully logged in with google',
            accessToken,
            refreshToken
        });
    }));
    //? INSTRUCTOR
    const registerInstructor = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const files = req.files;
        const instructor = req.body;
        yield (0, instructorAuth_1.instructorRegister)(instructor, files, dbRepositoryInstructor, authService, cloudService);
        res.status(200).json({
            status: 'success',
            message: 'Your registration is pending verification by the administrators.You will receive an email once your registration is approved'
        });
    }));
    const loginInstructor = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const { accessToken, refreshToken } = yield (0, instructorAuth_1.instructorLogin)(email, password, dbRepositoryInstructor, dbRepositoryRefreshToken, authService);
        res.status(200).json({
            status: 'success',
            message: 'Instructor logged in successfully',
            accessToken,
            refreshToken
        });
    }));
    //? ADMIN
    const loginAdmin = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const { accessToken, refreshToken } = yield (0, adminAuth_1.adminLogin)(email, password, dbRepositoryAdmin, dbRepositoryRefreshToken, authService);
        res.status(200).json({
            status: 'success',
            message: 'Successfully logged in ',
            accessToken,
            refreshToken
        });
    }));
    return {
        loginStudent,
        registerStudent,
        loginWithGoogle,
        registerInstructor,
        loginInstructor,
        loginAdmin
    };
};
exports.default = authController;
