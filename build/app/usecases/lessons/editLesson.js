"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.editLessonsU = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const ffprobePath = __importStar(require("ffprobe-static"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const fs = __importStar(require("fs"));
const editLessonsU = (media, lessonId, lesson, lessonDbRepository, cloudService, quizDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!lesson) {
        throw new appError_1.default('Data is not provided', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    let isStudyMaterialUpdated = false, isLessonVideoUpdated = false;
    const oldLesson = yield lessonDbRepository.getLessonById(lessonId);
    if (media === null || media === void 0 ? void 0 : media.length) {
        const videoFile = media[0];
        const tempFilePath = './temp_video.mp4';
        fs.writeFileSync(tempFilePath, videoFile.buffer);
        const getVideoDuration = () => new Promise((resolve, reject) => {
            (0, fluent_ffmpeg_1.default)(tempFilePath)
                .setFfprobePath(ffprobePath.path)
                .ffprobe((err, data) => {
                fs.unlinkSync(tempFilePath);
                if (err) {
                    console.error('Error while probing the video:', err);
                    reject(err);
                }
                const duration = data.format.duration;
                resolve(duration);
            });
        });
        try {
            const videoDuration = yield getVideoDuration();
            lesson.duration = parseFloat(videoDuration);
        }
        catch (error) {
            console.error('Error while getting video duration:', error);
        }
    }
    lesson.media = [];
    if (media && media.length > 0) {
        const uploadPromises = media.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            if (file.mimetype === 'application/pdf') {
                const studyMaterial = yield cloudService.upload(file);
                lesson.media.push(studyMaterial);
                isStudyMaterialUpdated = true;
            }
            else {
                const lessonVideo = yield cloudService.upload(file);
                lesson.media.push(lessonVideo);
                isLessonVideoUpdated = true;
            }
        }));
        yield Promise.all(uploadPromises);
    }
    const response = yield lessonDbRepository.editLesson(lessonId, lesson);
    if (!response) {
        throw new appError_1.default('Failed to edit lesson', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    yield quizDbRepository.editQuiz(lessonId, { questions: lesson.questions });
    if (response) {
        if (isLessonVideoUpdated && (oldLesson === null || oldLesson === void 0 ? void 0 : oldLesson.media)) {
            const videoObject = response.media.find((item) => item.name === 'lessonVideo');
            yield cloudService.removeFile((_a = videoObject === null || videoObject === void 0 ? void 0 : videoObject.key) !== null && _a !== void 0 ? _a : '');
        }
        if (isStudyMaterialUpdated && (oldLesson === null || oldLesson === void 0 ? void 0 : oldLesson.media)) {
            const materialObject = response.media.find((item) => item.name === 'materialFile');
            yield cloudService.removeFile((_b = materialObject === null || materialObject === void 0 ? void 0 : materialObject.key) !== null && _b !== void 0 ? _b : '');
        }
    }
});
exports.editLessonsU = editLessonsU;
