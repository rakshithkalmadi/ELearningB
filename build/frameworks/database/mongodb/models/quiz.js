"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const quizSchema = new mongoose_1.Schema({
    courseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    lessonId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'lessons',
        required: true
    },
    questions: [
        {
            question: {
                type: String,
                required: true,
                minlength: 5
            },
            options: [
                {
                    option: {
                        type: String,
                        required: true
                    },
                    isCorrect: {
                        type: Boolean,
                        required: true
                    }
                }
            ]
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Quiz = (0, mongoose_1.model)('Quiz', quizSchema, 'quiz');
exports.default = Quiz;
