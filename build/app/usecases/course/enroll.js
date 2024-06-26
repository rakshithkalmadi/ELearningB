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
exports.enrollStudentU = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const enrollStudentU = (courseId, studentId, paymentInfo, courseDbRepository, paymentDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!courseId) {
        throw new appError_1.default('Please provide course details', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (!studentId) {
        throw new appError_1.default('Please provide valid student details', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const course = yield courseDbRepository.getCourseById(courseId);
    if (course === null || course === void 0 ? void 0 : course.isPaid) {
        const payment = {
            paymentId: paymentInfo.id,
            courseId: courseId,
            studentId: studentId,
            amount: paymentInfo.amount / 100,
            currency: paymentInfo.currency,
            payment_method: paymentInfo.payment_method,
            status: paymentInfo.status
        };
        yield Promise.all([
            courseDbRepository.enrollStudent(courseId, studentId),
            paymentDbRepository.savePayment(payment)
        ]);
    }
    else {
        yield courseDbRepository.enrollStudent(courseId, studentId);
    }
});
exports.enrollStudentU = enrollStudentU;
