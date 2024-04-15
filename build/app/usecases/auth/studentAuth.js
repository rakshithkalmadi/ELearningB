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
exports.signInWithGoogle = exports.studentLogin = exports.studentRegister = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const studentRegister = (student, studentRepository, refreshTokenRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    student.email = (_a = student === null || student === void 0 ? void 0 : student.email) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    const isEmailAlreadyRegistered = yield studentRepository.getStudentByEmail(student.email);
    if (isEmailAlreadyRegistered) {
        throw new appError_1.default('User with same email already exists...!', HttpStatusCodes_1.default.CONFLICT);
    }
    if (student.password) {
        student.password = yield authService.hashPassword(student.password);
    }
    if (student.interests) {
        const interests = [];
        student.interests.map((interest) => interests.push(interest.label));
        student.interests = interests;
    }
    const { _id: studentId, email } = yield studentRepository.addStudent(student);
    const payload = {
        Id: studentId,
        email,
        role: 'student'
    };
    const accessToken = authService.generateToken(payload);
    const refreshToken = authService.generateRefreshToken(payload);
    const expirationDate = authService.decodedTokenAndReturnExpireDate(refreshToken);
    yield refreshTokenRepository.saveRefreshToken(studentId, refreshToken, expirationDate);
    return { accessToken, refreshToken };
});
exports.studentRegister = studentRegister;
const studentLogin = (email, password, studentRepository, refreshTokenRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield studentRepository.getStudentByEmail(email);
    if (!student) {
        throw new appError_1.default("this user doesn't exist", HttpStatusCodes_1.default.NOT_FOUND);
    }
    const isPasswordCorrect = yield authService.comparePassword(password, student.password);
    if (!isPasswordCorrect) {
        throw new appError_1.default('Sorry, your password is incorrect. Please try again', HttpStatusCodes_1.default.UNAUTHORIZED);
    }
    const payload = {
        Id: student._id,
        email: student.email,
        role: 'student'
    };
    yield refreshTokenRepository.deleteRefreshToken(student._id);
    const accessToken = authService.generateToken(payload);
    const refreshToken = authService.generateRefreshToken(payload);
    const expirationDate = authService.decodedTokenAndReturnExpireDate(refreshToken);
    yield refreshTokenRepository.saveRefreshToken(student._id, refreshToken, expirationDate);
    return { accessToken, refreshToken };
});
exports.studentLogin = studentLogin;
const signInWithGoogle = (credential, googleAuthService, studentRepository, refreshTokenRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield googleAuthService.verify(credential);
    const isUserExist = yield studentRepository.getStudentByEmail(user.email);
    if (isUserExist) {
        const payload = {
            Id: isUserExist._id,
            email: isUserExist.email,
            role: 'student'
        };
        yield refreshTokenRepository.deleteRefreshToken(isUserExist._id);
        const accessToken = authService.generateToken(payload);
        const refreshToken = authService.generateRefreshToken(payload);
        const expirationDate = authService.decodedTokenAndReturnExpireDate(refreshToken);
        yield refreshTokenRepository.saveRefreshToken(isUserExist._id, refreshToken, expirationDate);
        return { accessToken, refreshToken };
    }
    else {
        const { _id: userId, email } = yield studentRepository.addStudent(user);
        const payload = { Id: userId, email, role: 'student' };
        const accessToken = authService.generateToken(payload);
        const refreshToken = authService.generateRefreshToken(payload);
        const expirationDate = authService.decodedTokenAndReturnExpireDate(refreshToken);
        yield refreshTokenRepository.saveRefreshToken(userId, refreshToken, expirationDate);
        return { accessToken, refreshToken };
    }
});
exports.signInWithGoogle = signInWithGoogle;
