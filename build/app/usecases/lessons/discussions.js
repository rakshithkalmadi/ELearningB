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
exports.getRepliesByDiscussionIdU = exports.replyDiscussionU = exports.deleteDiscussionByIdU = exports.editDiscussionU = exports.getDiscussionsByLessonU = exports.addDiscussionU = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const addDiscussionU = (studentId, lessonId, discussion, discussionDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!discussion) {
        throw new appError_1.default('Please provide data', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (!studentId) {
        throw new appError_1.default('user not found', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    discussion.lessonId = lessonId;
    discussion.studentId = studentId;
    yield discussionDbRepository.addDiscussion(discussion);
});
exports.addDiscussionU = addDiscussionU;
const getDiscussionsByLessonU = (lessonId, discussionDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!lessonId) {
        throw new appError_1.default('Please provide a lesson id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const discussions = yield discussionDbRepository.getDiscussionsByLesson(lessonId);
    return discussions;
});
exports.getDiscussionsByLessonU = getDiscussionsByLessonU;
const editDiscussionU = (discussionId, message, discussionDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!discussionId) {
        throw new appError_1.default('Please provide a discussion id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    message = message.trim();
    if (!message) {
        throw new appError_1.default('Please provide a valid message', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    yield discussionDbRepository.editDiscussion(discussionId, message);
});
exports.editDiscussionU = editDiscussionU;
const deleteDiscussionByIdU = (discussionId, discussionDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!discussionId) {
        throw new appError_1.default('Please provide a discussion id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    yield discussionDbRepository.deleteDiscussionById(discussionId);
});
exports.deleteDiscussionByIdU = deleteDiscussionByIdU;
const replyDiscussionU = (discussionId, reply, discussionDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!discussionId) {
        throw new appError_1.default('Please provide a discussion id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    if (!reply) {
        throw new appError_1.default('Please provide valid data', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    yield discussionDbRepository.replyDiscussion(discussionId, reply);
});
exports.replyDiscussionU = replyDiscussionU;
const getRepliesByDiscussionIdU = (discussionId, discussionDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!discussionId) {
        throw new appError_1.default('Please provide a discussion id', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const replies = yield discussionDbRepository.getRepliesByDiscussionId(discussionId);
    return replies;
});
exports.getRepliesByDiscussionIdU = getRepliesByDiscussionIdU;
