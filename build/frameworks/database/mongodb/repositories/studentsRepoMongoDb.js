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
exports.studentRepositoryMongoDB = void 0;
const student_1 = __importDefault(require("../models/student"));
const mongoose_1 = __importDefault(require("mongoose"));
const studentRepositoryMongoDB = () => {
    const addStudent = (student) => __awaiter(void 0, void 0, void 0, function* () {
        const newStudent = new student_1.default(student);
        return yield newStudent.save();
    });
    const getStudentByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield student_1.default.findOne({ email });
        return user;
    });
    const getStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const student = yield student_1.default.findById({
            _id: new mongoose_1.default.Types.ObjectId(id)
        });
        return student;
    });
    const changePassword = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
        yield student_1.default.updateOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, { password });
    });
    const updateProfile = (id, studentInfo) => __awaiter(void 0, void 0, void 0, function* () {
        yield student_1.default.updateOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, Object.assign({}, studentInfo));
    });
    const getAllStudents = () => __awaiter(void 0, void 0, void 0, function* () {
        const students = yield student_1.default.find({});
        return students;
    });
    const blockStudent = (id, reason) => __awaiter(void 0, void 0, void 0, function* () {
        yield student_1.default.updateOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, { isBlocked: true, blockedReason: reason });
    });
    const unblockStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
        yield student_1.default.updateOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, { isBlocked: false, blockedReason: '' });
    });
    const getAllBlockedStudents = () => __awaiter(void 0, void 0, void 0, function* () {
        const blockedStudents = yield student_1.default.find({
            isBlocked: true
        });
        return blockedStudents;
    });
    const getTotalNumberOfStudents = () => __awaiter(void 0, void 0, void 0, function* () {
        const total = yield student_1.default.find().count();
        return total;
    });
    return {
        addStudent,
        getStudentByEmail,
        getStudent,
        changePassword,
        updateProfile,
        getAllStudents,
        blockStudent,
        unblockStudent,
        getAllBlockedStudents,
        getTotalNumberOfStudents
    };
};
exports.studentRepositoryMongoDB = studentRepositoryMongoDB;
