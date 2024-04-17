"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
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
const studentSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please enter a valid email'
        ]
    },
    profilePic: {
        type: ProfileSchema,
        required: false
    },
    mobile: {
        type: String,
        required: function () {
            return !this.isGoogleUser; // Required for non-Google users
        },
        trim: true,
        // unique:true,
        sparse: true, // Allow multiple null values
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number']
    },
    interests: {
        type: [String],
        required: true,
        default: []
    },
    password: {
        type: String,
        required: function () {
            return !this.isGoogleUser;
        },
        minlength: 8
    },
    dateJoined: {
        type: Date,
        default: Date.now
    },
    isGoogleUser: {
        type: Boolean,
        default: false
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
    blockedReason: {
        type: String,
        default: ''
    }
});
const Students = (0, mongoose_1.model)('Students', studentSchema, 'students');
exports.default = Students;
