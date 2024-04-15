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
exports.discussionRepositoryMongoDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const discussions_1 = __importDefault(require("../models/discussions"));
const discussionRepositoryMongoDb = () => {
    const addDiscussion = (discussion) => __awaiter(void 0, void 0, void 0, function* () {
        const newDiscussion = new discussions_1.default(discussion);
        yield newDiscussion.save();
    });
    const getDiscussionsByLesson = (lessonId) => __awaiter(void 0, void 0, void 0, function* () {
        const discussionsWithUserDetails = yield discussions_1.default.aggregate([
            {
                $match: { lessonId: new mongoose_1.default.Types.ObjectId(lessonId) }
            },
            {
                $lookup: {
                    from: 'students',
                    localField: 'studentId',
                    foreignField: '_id',
                    as: 'studentDetails'
                }
            },
            {
                $unwind: '$studentDetails'
            },
            {
                $project: {
                    _id: 1,
                    message: 1,
                    lessonId: 1,
                    replies: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    'studentDetails._id': 1,
                    'studentDetails.firstName': 1,
                    'studentDetails.lastName': 1,
                    'studentDetails.profilePic': 1,
                    'studentDetails.dateJoined': 1
                }
            },
            {
                $sort: { createdAt: -1 }
            }
        ]);
        return discussionsWithUserDetails;
    });
    const editDiscussion = (id, message) => __awaiter(void 0, void 0, void 0, function* () {
        yield discussions_1.default.updateOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, { message, updatedAt: Date.now() });
    });
    const deleteDiscussionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield discussions_1.default.deleteOne({ _id: new mongoose_1.default.Types.ObjectId(id) });
    });
    const replyDiscussion = (id, reply) => __awaiter(void 0, void 0, void 0, function* () {
        yield discussions_1.default.updateOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, { $push: { replies: reply } });
    });
    const getRepliesByDiscussionId = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield discussions_1.default.aggregate([
            {
                $match: { _id: new mongoose_1.default.Types.ObjectId(id) }
            },
            {
                $project: {
                    replies: 1
                }
            },
            {
                $unwind: '$replies'
            },
            {
                $lookup: {
                    from: 'students',
                    localField: 'replies.studentId',
                    foreignField: '_id',
                    as: 'repliesWithStudent'
                }
            },
            {
                $unwind: '$repliesWithStudent'
            },
            {
                $group: {
                    _id: '$_id',
                    replies: {
                        $push: {
                            _id: '$replies._id',
                            message: '$replies.message',
                            createdAt: '$replies.createdAt',
                            updatedAt: '$replies.updatedAt',
                            studentDetails: '$repliesWithStudent'
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    'replies._id': 1,
                    'replies.message': 1,
                    'replies.createdAt': 1,
                    'replies.updatedAt': 1,
                    'replies.studentDetails._id': 1,
                    'replies.studentDetails.firstName': 1,
                    'replies.studentDetails.lastName': 1,
                    'replies.studentDetails.dateJoined': 1
                }
            }
        ]);
        const replies = result.length > 0 ? result[0].replies : [];
        return replies;
    });
    return {
        addDiscussion,
        getDiscussionsByLesson,
        editDiscussion,
        deleteDiscussionById,
        replyDiscussion,
        getRepliesByDiscussionId
    };
};
exports.discussionRepositoryMongoDb = discussionRepositoryMongoDb;
