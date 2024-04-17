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
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonDbRepository = void 0;
const lessonDbRepository = (repository) => {
    const addLesson = (courseId, instructorId, lesson) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addLesson(courseId, instructorId, lesson); });
    const editLesson = (lessonId, lessonInfo) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.editLesson(lessonId, lessonInfo); });
    const getLessonsByCourseId = (courseId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getLessonsByCourseId(courseId); });
    const getLessonById = (lessonId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getLessonById(lessonId); });
    return {
        addLesson,
        editLesson,
        getLessonById,
        getLessonsByCourseId
    };
};
exports.lessonDbRepository = lessonDbRepository;
