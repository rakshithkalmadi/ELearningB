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
exports.instructorLogin = exports.instructorRegister = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const instructorRegister = (instructor, files, instructorRepository, authService, cloudService) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(files);
    instructor.certificates = [];
    // Use object destructuring and default value
    const { password = '', email = '' } = instructor;
    instructor.email = email.toLowerCase();
    // Check if the email is already registered
    const isEmailAlreadyRegistered = yield instructorRepository.getInstructorByEmail(instructor.email);
    if (isEmailAlreadyRegistered) {
        throw new appError_1.default('Instructor with the same email already exists..!', HttpStatusCodes_1.default.CONFLICT);
    }
    for (const file of files) {
        let uploadedFile;
        if (file.originalname === 'profilePic') {
            uploadedFile = yield cloudService.upload(file);
            instructor.profilePic = uploadedFile;
        }
        else {
            uploadedFile = yield cloudService.upload(file);
            instructor.certificates.push(uploadedFile);
        }
    }
    // Hash the password if provided
    if (password) {
        instructor.password = yield authService.hashPassword(password);
    }
    console.log(instructor);
    // Add instructor to the repository
    const response = yield instructorRepository.addInstructor(instructor);
    return response
        ? { status: true, message: 'Successfully registered!' }
        : { status: false, message: 'Failed to register!' };
});
exports.instructorRegister = instructorRegister;
const instructorLogin = (email, password, instructorRepository, refreshTokenRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const instructor = yield instructorRepository.getInstructorByEmail(email);
    if (!instructor) {
        throw new appError_1.default("Instructor doesn't exist, please register", HttpStatusCodes_1.default.UNAUTHORIZED);
    }
    if (!instructor.isVerified) {
        throw new appError_1.default('Your details is under verification please try again later', HttpStatusCodes_1.default.UNAUTHORIZED);
    }
    const isPasswordCorrect = yield authService.comparePassword(password, instructor.password);
    if (!isPasswordCorrect) {
        throw new appError_1.default('Sorry, your password is incorrect. Please try again', HttpStatusCodes_1.default.UNAUTHORIZED);
    }
    const payload = {
        Id: instructor._id,
        email: instructor.email,
        role: 'instructor'
    };
    yield refreshTokenRepository.deleteRefreshToken(instructor._id);
    const accessToken = authService.generateToken(payload);
    const refreshToken = authService.generateRefreshToken(payload);
    const expirationDate = authService.decodedTokenAndReturnExpireDate(refreshToken);
    yield refreshTokenRepository.saveRefreshToken(instructor._id, refreshToken, expirationDate);
    return {
        accessToken,
        refreshToken
    };
});
exports.instructorLogin = instructorLogin;
