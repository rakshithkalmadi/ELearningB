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
exports.getQuizzesLessonU = void 0;
const appError_1 = __importDefault(require("../../../utils/appError"));
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const shuffle_1 = require("../../../app/helper/shuffle");
const getQuizzesLessonU = (lessonId, quizDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!lessonId) {
        throw new appError_1.default('Lesson id not found', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const quizzes = yield quizDbRepository.getQuizByLessonId(lessonId);
    return (0, shuffle_1.shuffleQuiz)(quizzes);
});
exports.getQuizzesLessonU = getQuizzesLessonU;
