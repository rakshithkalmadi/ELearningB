"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MediaSchema = new mongoose_1.Schema({
    key: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    }
});
const LessonSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    contents: {
        type: (Array),
        required: true
    },
    duration: {
        type: Number,
        required: true,
        min: 0
    },
    instructorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'instructor',
        required: true
    },
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    about: {
        type: String,
        required: true
    },
    media: {
        type: [MediaSchema]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});
const Lessons = (0, mongoose_1.model)('Lesson', LessonSchema, 'lessons');
exports.default = Lessons;
