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
exports.lessonRepositoryMongodb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const lessons_1 = __importDefault(require("../models/lessons"));
const lessonRepositoryMongodb = () => {
    const addLesson = (courseId, instructorId, lesson) => __awaiter(void 0, void 0, void 0, function* () {
        lesson.courseId = courseId;
        lesson.instructorId = instructorId;
        const newLesson = new lessons_1.default(lesson);
        const { _id } = yield newLesson.save();
        return _id;
    });
    const editLesson = (lessonId, lesson) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield lessons_1.default.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(lessonId) }, Object.assign({}, lesson));
        return response;
    });
    const getLessonsByCourseId = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        const lessons = yield lessons_1.default.find({
            courseId: new mongoose_1.default.Types.ObjectId(courseId)
        });
        return lessons;
    });
    const getLessonById = (lessonId) => __awaiter(void 0, void 0, void 0, function* () {
        const lesson = yield lessons_1.default.findOne({
            _id: new mongoose_1.default.Types.ObjectId(lessonId)
        });
        return lesson;
    });
    return {
        addLesson,
        editLesson,
        getLessonsByCourseId,
        getLessonById
    };
};
exports.lessonRepositoryMongodb = lessonRepositoryMongodb;
