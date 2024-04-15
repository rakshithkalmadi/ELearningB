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
exports.courseDbRepository = void 0;
const courseDbRepository = (repository) => {
    const addCourse = (courseInfo) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addCourse(courseInfo); });
    const editCourse = (courseId, editInfo) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.editCourse(courseId, editInfo); });
    const getAllCourse = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllCourse(); });
    const getCourseById = (courseId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getCourseById(courseId); });
    const getCourseByInstructorId = (instructorId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getCourseByInstructorId(instructorId); });
    const getAmountByCourseId = (courseId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAmountByCourseId(courseId); });
    const enrollStudent = (courseId, studentId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.enrollStudent(courseId, studentId); });
    const getRecommendedCourseByStudentInterest = (studentId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getRecommendedCourseByStudentInterest(studentId); });
    const getTrendingCourse = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getTrendingCourses(); });
    const getCourseByStudent = (studentId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getCourseByStudent(studentId); });
    const getTotalNumberOfCourses = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getTotalNumberOfCourses(); });
    const getNumberOfCoursesAddedInEachMonth = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getNumberOfCoursesAddedInEachMonth(); });
    const getStudentsByCourseForInstructor = (instructorId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getStudentsByCourseForInstructor(instructorId); });
    const searchCourse = (isFree, searchQuery, filterQuery) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.searchCourse(isFree, searchQuery, filterQuery); });
    return {
        addCourse,
        editCourse,
        getAllCourse,
        getCourseById,
        getCourseByInstructorId,
        getAmountByCourseId,
        enrollStudent,
        getRecommendedCourseByStudentInterest,
        getTrendingCourse,
        getCourseByStudent,
        getTotalNumberOfCourses,
        getNumberOfCoursesAddedInEachMonth,
        getStudentsByCourseForInstructor,
        searchCourse
    };
};
exports.courseDbRepository = courseDbRepository;
