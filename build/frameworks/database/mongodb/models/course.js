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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const FileSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    url: {
        type: String
    }
});
const courseSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100
    },
    instructorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true
    },
    duration: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: function () {
            return this.isPaid;
        },
        min: 0,
    },
    isPaid: {
        type: Boolean,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 10
    },
    syllabus: {
        type: [String],
        required: true
    },
    requirements: {
        type: [String]
    },
    thumbnail: {
        type: FileSchema,
        required: true
    },
    thumbnailUrl: {
        type: String,
        default: ''
    },
    guidelines: {
        type: FileSchema,
        required: true
    },
    guidelinesUrl: {
        type: String,
        default: ''
    },
    introduction: {
        type: FileSchema,
        required: true
    },
    coursesEnrolled: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'students'
        }
    ],
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    completionStatus: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    }
});
// courseSchema.index(
//   {
//     title: 'text',
//     category: 'text',
//     level: 'text',
//     price: 'text'
//   },
//   {
//     weights: {
//       title: 4,
//       category: 3,
//       level: 2,
//       price: 1
//     }
//   }
// );
const Course = (0, mongoose_1.model)('Course', courseSchema, 'course');
exports.default = Course;
