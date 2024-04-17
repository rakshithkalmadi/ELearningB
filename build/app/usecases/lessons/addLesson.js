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
exports.addLessonsU = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const ffprobePath = __importStar(require("ffprobe-static"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const fs = __importStar(require("fs"));
const addLessonsU = (media, courseId, instructorId, lesson, lessonDbRepository, cloudService, quizDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!courseId) {
        throw new appError_1.default('Please provide a course id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (!instructorId) {
        throw new appError_1.default('Please provide an instructor id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (!lesson) {
        throw new appError_1.default('Data is not provided', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (media) {
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
    if (media) {
        lesson.media = yield Promise.all(media.map((files) => __awaiter(void 0, void 0, void 0, function* () { return yield cloudService.upload(files); })));
    }
    const lessonId = yield lessonDbRepository.addLesson(courseId, instructorId, lesson);
    if (!lessonId) {
        throw new appError_1.default('Data is not provided', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const quiz = {
        courseId,
        lessonId: lessonId.toString(),
        questions: lesson.questions
    };
    yield quizDbRepository.addQuiz(quiz);
});
exports.addLessonsU = addLessonsU;
