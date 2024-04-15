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
exports.quizRepositoryMongodb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const quiz_1 = __importDefault(require("../models/quiz"));
const quizRepositoryMongodb = () => {
    const getQuizByLessonId = (lessonId) => __awaiter(void 0, void 0, void 0, function* () {
        const quiz = yield quiz_1.default.findOne({
            lessonId: new mongoose_1.default.Types.ObjectId(lessonId)
        });
        return quiz;
    });
    const addQuiz = (quiz) => __awaiter(void 0, void 0, void 0, function* () {
        const newQuiz = new quiz_1.default(quiz);
        const { _id: quizId } = yield newQuiz.save();
        return quizId;
    });
    const editQuiz = (lessonId, quizInfo) => __awaiter(void 0, void 0, void 0, function* () {
        yield quiz_1.default.updateOne({ lessonId: new mongoose_1.default.Types.ObjectId(lessonId) }, Object.assign({}, quizInfo));
    });
    return {
        addQuiz,
        editQuiz,
        getQuizByLessonId
    };
};
exports.quizRepositoryMongodb = quizRepositoryMongodb;
