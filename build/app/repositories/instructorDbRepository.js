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
exports.instructorDbRepository = void 0;
const instructorDbRepository = (repository) => {
    const addInstructor = (instructor) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addInstructor(instructor); });
    const getInstructorByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getInstructorByEmail(email); });
    const getInstructorRequests = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getInstructorRequests(); });
    const acceptInstructorRequest = (instructorId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.acceptInstructorRequest(instructorId); });
    const checkRejected = (instructorId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.checkRejected(instructorId); });
    const rejectInstructorRequest = (instructorId, reason) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.rejectInstructorRequest(instructorId, reason); });
    const getAllInstructors = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllInstructors(); });
    const blockInstructors = (instructorId, reason) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.blockInstructors(instructorId, reason); });
    const unblockInstructors = (instructorId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.unblockInstructors(instructorId); });
    const getBlockedInstructors = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getBlockedInstructors(); });
    const getInstructorById = (instructorId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getInstructorById(instructorId); });
    const getTotalNumberOfInstructors = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getTotalNumberOfInstructors(); });
    const changePassword = (id, password) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.changePassword(id, password); });
    const updateProfile = (id, instructorInfo) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.updateProfile(id, instructorInfo); });
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
exports.instructorDbRepository = instructorDbRepository;
