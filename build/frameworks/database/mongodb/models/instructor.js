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
const ProfileSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    key: {
        type: String
    },
    url: {
        type: String
    }
});
const instructorSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email',
        ],
    },
    profilePic: {
        type: ProfileSchema,
        required: true,
    },
    certificates: {
        type: (Array),
        required: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number'],
    },
    qualification: {
        type: String,
        required: true,
    },
    subjects: {
        type: (Array),
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    skills: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    coursesCreated: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Courses',
        },
    ],
    rejected: { type: Boolean, default: false },
    rejectedReason: { type: String, default: '' },
    isBlocked: { type: Boolean, default: false },
    blockedReason: { type: String, default: '' },
    dateJoined: {
        type: Date,
        default: Date.now,
    },
    profileUrl: {
        type: String,
        default: "",
    },
});
const Instructor = (0, mongoose_1.model)('Instructors', instructorSchema, 'instructor');
exports.default = Instructor;
