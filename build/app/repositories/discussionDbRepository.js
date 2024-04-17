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
exports.discussionDbRepository = void 0;
const discussionDbRepository = (repository) => {
    const addDiscussion = (discussionInfo) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addDiscussion(discussionInfo); });
    const getDiscussionsByLesson = (lessonId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getDiscussionsByLesson(lessonId); });
    const editDiscussion = (id, message) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.editDiscussion(id, message); });
    const deleteDiscussionById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.deleteDiscussionById(id); });
    const replyDiscussion = (id, reply) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.replyDiscussion(id, reply); });
    const getRepliesByDiscussionId = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getRepliesByDiscussionId(id); });
    return {
        addDiscussion,
        getDiscussionsByLesson,
        editDiscussion,
        deleteDiscussionById,
        replyDiscussion,
        getRepliesByDiscussionId
    };
};
exports.discussionDbRepository = discussionDbRepository;
