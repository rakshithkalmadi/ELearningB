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
exports.instructorRepoMongoDb = void 0;
const instructor_1 = __importDefault(require("../models/instructor"));
const mongoose_1 = __importDefault(require("mongoose"));
const instructorRepoMongoDb = () => {
    const addInstructor = (instructor) => __awaiter(void 0, void 0, void 0, function* () {
        return yield instructor_1.default.create(instructor);
    });
    const getInstructorByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const instructor = yield instructor_1.default.findOne({ email });
        return instructor;
    });
    const getInstructorRequests = () => __awaiter(void 0, void 0, void 0, function* () {
        const instructors = yield instructor_1.default.find({ isVerified: false });
        return instructors;
    });
    const acceptInstructorRequest = (instructorId) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield instructor_1.default.findOneAndUpdate({ _id: instructorId }, { isVerified: true });
        return response;
    });
    const checkRejected = (instructorId) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield instructor_1.default.findOne({
            $and: [
                { _id: new mongoose_1.default.Types.ObjectId(instructorId) },
                { rejected: true }
            ]
        });
        return result;
    });
    const rejectInstructorRequest = (instructorId, reason) => __awaiter(void 0, void 0, void 0, function* () {
        const options = {
            upsert: true,
            new: true
        };
        const update = {
            $set: { rejectedReason: reason, rejected: true }
        };
        const response = yield instructor_1.default.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(instructorId) }, update, options);
        return response;
    });
    const getAllInstructors = () => __awaiter(void 0, void 0, void 0, function* () {
        const instructors = yield instructor_1.default.find({});
        return instructors;
    });
    const blockInstructors = (instructorId, reason) => __awaiter(void 0, void 0, void 0, function* () {
        yield instructor_1.default.updateOne({ _id: new mongoose_1.default.Types.ObjectId(instructorId) }, {
            $set: {
                isBlocked: true,
                blockedReason: reason
            }
        });
        return instructorId;
    });
    const unblockInstructors = (instructorId) => __awaiter(void 0, void 0, void 0, function* () {
        yield instructor_1.default.updateOne({ _id: new mongoose_1.default.Types.ObjectId(instructorId) }, {
            $set: {
                isBlocked: false
            }
        });
    });
    const getBlockedInstructors = () => __awaiter(void 0, void 0, void 0, function* () {
        const blockedInstructors = yield instructor_1.default.find({ isBlocked: true });
        return blockedInstructors;
    });
    const getInstructorById = (instructorId) => __awaiter(void 0, void 0, void 0, function* () {
        const instructor = yield instructor_1.default.findOne({
            _id: new mongoose_1.default.Types.ObjectId(instructorId)
        });
        return instructor;
    });
    const getTotalNumberOfInstructors = () => __awaiter(void 0, void 0, void 0, function* () {
        const total = yield instructor_1.default.find().count();
        return total;
    });
    const changePassword = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
        yield instructor_1.default.updateOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, { password });
    });
    const updateProfile = (id, instructorInfo) => __awaiter(void 0, void 0, void 0, function* () {
        yield instructor_1.default.updateOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, Object.assign({}, instructorInfo));
    });
    return {
        addInstructor,
        getInstructorByEmail,
        getInstructorRequests,
        acceptInstructorRequest,
        checkRejected,
        rejectInstructorRequest,
        getAllInstructors,
        blockInstructors,
        unblockInstructors,
        getBlockedInstructors,
        getInstructorById,
        getTotalNumberOfInstructors,
        changePassword,
        updateProfile
    };
};
exports.instructorRepoMongoDb = instructorRepoMongoDb;
