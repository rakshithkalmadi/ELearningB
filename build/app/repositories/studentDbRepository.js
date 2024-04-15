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
exports.studentDbRepository = void 0;
const studentDbRepository = (repository) => {
    const addStudent = (student) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addStudent(student); });
    const getStudentByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getStudentByEmail(email); });
    const getStudent = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getStudent(id); });
    const changePassword = (id, password) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.changePassword(id, password); });
    const updateProfile = (id, studentInfo) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.updateProfile(id, studentInfo); });
    const getAllStudents = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllStudents(); });
    const blockStudent = (id, reason) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.blockStudent(id, reason); });
    const unblockStudent = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.unblockStudent(id); });
    const getAllBlockedStudents = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllBlockedStudents(); });
    const getTotalNumberOfStudents = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getTotalNumberOfStudents(); });
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
exports.studentDbRepository = studentDbRepository;
