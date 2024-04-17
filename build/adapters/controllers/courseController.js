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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const addCourse_1 = require("../../app/usecases/course/addCourse");
const listCourse_1 = require("../../app/usecases/course/listCourse");
const viewCourse_1 = require("../../app/usecases/course/viewCourse");
const addLesson_1 = require("../../app/usecases/lessons/addLesson");
const viewLessons_1 = require("../../app/usecases/lessons/viewLessons");
const getQuiz_1 = require("../../app/usecases/quiz/getQuiz");
const getLesson_1 = require("../../app/usecases/lessons/getLesson");
const discussions_1 = require("../../app/usecases/lessons/discussions");
const enroll_1 = require("../../app/usecases/course/enroll");
const recommendation_1 = require("../../app/usecases/course/recommendation");
const editCourse_1 = require("../../app/usecases/course/editCourse");
const editLesson_1 = require("../../app/usecases/lessons/editLesson");
const search_1 = require("../../app/usecases/course/search");
const courseController = (cloudServiceInterface, cloudServiceImpl, courseDbRepository, courseDbRepositoryImpl, quizDbRepository, quizDbRepositoryImpl, lessonDbRepository, lessonDbRepositoryImpl, discussionDbRepository, discussionDbRepositoryImpl, paymentDbRepository, paymentDbRepositoryImpl, cacheDbRepository, cacheDbRepositoryImpl, cacheClient) => {
    const dbRepositoryCourse = courseDbRepository(courseDbRepositoryImpl());
    const cloudService = cloudServiceInterface(cloudServiceImpl());
    const dbRepositoryQuiz = quizDbRepository(quizDbRepositoryImpl());
    const dbRepositoryLesson = lessonDbRepository(lessonDbRepositoryImpl());
    const dbRepositoryDiscussion = discussionDbRepository(discussionDbRepositoryImpl());
    const dbRepositoryPayment = paymentDbRepository(paymentDbRepositoryImpl());
    const dbRepositoryCache = cacheDbRepository(cacheDbRepositoryImpl(cacheClient));
    const addCourse = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const course = req.body;
        const files = req.files;
        const instructorId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.Id;
        const response = yield (0, addCourse_1.addCourses)(instructorId, course, files, cloudService, dbRepositoryCourse);
        console.log(response);
        res.status(201).json({
            status: 'success',
            message: 'Successfully added new course, course will be published after verification',
            data: response
        });
    }));
    const editCourse = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const course = req.body;
        const files = req.files;
        const instructorId = (_b = req.user) === null || _b === void 0 ? void 0 : _b.Id;
        const courseId = req.params.courseId;
        const response = yield (0, editCourse_1.editCourseU)(courseId, instructorId, files, course, cloudService, dbRepositoryCourse);
        res.status(200).json({
            status: 'success',
            message: 'Successfully updated the course',
            data: response
        });
    }));
    const getAllCourses = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const courses = yield (0, listCourse_1.getAllCourseU)(cloudService, dbRepositoryCourse);
        const cacheOptions = {
            key: `all-courses`,
            expireTimeSec: 600,
            data: JSON.stringify(courses)
        };
        yield dbRepositoryCache.setCache(cacheOptions);
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved all courses',
            data: courses
        });
    }));
    const getIndividualCourse = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const courseId = req.params.courseId;
        const course = yield (0, listCourse_1.getCourseByIdU)(courseId, cloudService, dbRepositoryCourse);
        console.log(course);
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved the course',
            data: course
        });
    }));
    const getCoursesByInstructor = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const instructorId = (_c = req.user) === null || _c === void 0 ? void 0 : _c.Id;
        const courses = yield (0, viewCourse_1.getCourseByInstructorU)(instructorId, cloudService, dbRepositoryCourse);
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved your courses',
            data: courses
        });
    }));
    const addLesson = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
        const instructorId = (_d = req.user) === null || _d === void 0 ? void 0 : _d.Id;
        const courseId = req.params.courseId;
        const lesson = req.body;
        const medias = req.files;
        const questions = JSON.parse(lesson.questions);
        lesson.questions = questions;
        yield (0, addLesson_1.addLessonsU)(medias, courseId, instructorId, lesson, dbRepositoryLesson, cloudService, dbRepositoryQuiz);
        res.status(200).json({
            status: 'success',
            message: 'Successfully added new lesson',
            data: null
        });
    }));
    const editLesson = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const lesson = req.body;
        const lessonId = req.params.lessonId;
        const medias = req.files;
        const questions = JSON.parse(lesson.questions);
        lesson.questions = questions;
        yield (0, editLesson_1.editLessonsU)(medias, lessonId, lesson, dbRepositoryLesson, cloudService, dbRepositoryQuiz);
        res.status(200).json({
            status: 'success',
            message: 'Successfully updated the lesson',
            data: null
        });
    }));
    const getLessonsByCourse = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const courseId = req.params.courseId;
        const lessons = yield (0, viewLessons_1.getLessonsByCourseIdU)(courseId, dbRepositoryLesson);
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved lessons based on the course',
            data: lessons
        });
    }));
    const getLessonById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const lessonId = req.params.lessonId;
        const lesson = yield (0, getLesson_1.getLessonByIdU)(lessonId, dbRepositoryLesson);
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved lessons based on the course',
            data: lesson
        });
    }));
    const getQuizzesByLesson = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const lessonId = req.params.lessonId;
        const quizzes = yield (0, getQuiz_1.getQuizzesLessonU)(lessonId, dbRepositoryQuiz);
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved quizzes based on the lesson',
            data: quizzes
        });
    }));
    const addDiscussion = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _e;
        const lessonId = req.params.lessonId;
        const userId = (_e = req.user) === null || _e === void 0 ? void 0 : _e.Id;
        const discussion = req.body;
        yield (0, discussions_1.addDiscussionU)(userId, lessonId, discussion, dbRepositoryDiscussion);
        res.status(200).json({
            status: 'success',
            message: 'Successfully posted your comment',
            data: null
        });
    }));
    const getDiscussionsByLesson = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const lessonId = req.params.lessonId;
        const discussion = yield (0, discussions_1.getDiscussionsByLessonU)(lessonId, dbRepositoryDiscussion);
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved discussions based on a lesson',
            data: discussion
        });
    }));
    const editDiscussions = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const discussionId = req.params.discussionId;
        const message = req.body.message;
        yield (0, discussions_1.editDiscussionU)(discussionId, message, dbRepositoryDiscussion);
        res.status(200).json({
            status: 'success',
            message: 'Successfully edited your comment',
            data: null
        });
    }));
    const deleteDiscussion = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const discussionId = req.params.discussionId;
        yield (0, discussions_1.deleteDiscussionByIdU)(discussionId, dbRepositoryDiscussion);
        res.status(200).json({
            status: 'success',
            message: 'Successfully deleted your comment',
            data: null
        });
    }));
    const replyDiscussion = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const discussionId = req.params.discussionId;
        const reply = req.body.reply;
        yield (0, discussions_1.replyDiscussionU)(discussionId, reply, dbRepositoryDiscussion);
        res.status(200).json({
            status: 'success',
            message: 'Successfully replied to a comment',
            data: null
        });
    }));
    const getRepliesByDiscussion = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const discussionId = req.params.discussionId;
        const replies = yield (0, discussions_1.getRepliesByDiscussionIdU)(discussionId, dbRepositoryDiscussion);
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved replies based on discussion',
            data: replies
        });
    }));
    const enrollStudent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const paymentInfo = req.body;
        const { courseId } = req.params;
        const { Id } = req.user || {};
        const courseIdValue = courseId !== null && courseId !== void 0 ? courseId : '';
        const studentId = Id !== null && Id !== void 0 ? Id : '';
        yield (0, enroll_1.enrollStudentU)(courseIdValue, studentId, paymentInfo, dbRepositoryCourse, dbRepositoryPayment);
        res.status(200).json({
            status: 'success',
            message: 'Successfully enrolled into the course',
            data: null
        });
    }));
    const getRecommendedCourseByStudentInterest = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _f, _g;
        const studentId = (_g = (_f = req.user) === null || _f === void 0 ? void 0 : _f.Id) !== null && _g !== void 0 ? _g : '';
        const courses = yield (0, recommendation_1.getRecommendedCourseByStudentU)(studentId, cloudService, dbRepositoryCourse);
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved recommended courses',
            data: courses
        });
    }));
    const getTrendingCourses = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const courses = yield (0, recommendation_1.getTrendingCourseU)(cloudService, dbRepositoryCourse);
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved trending courses',
            data: courses
        });
    }));
    const getCourseByStudent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _h;
        const studentId = (_h = req.user) === null || _h === void 0 ? void 0 : _h.Id;
        const courses = yield (0, listCourse_1.getCourseByStudentU)(studentId, cloudService, dbRepositoryCourse);
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved courses based on students',
            data: courses
        });
    }));
    const searchCourse = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { search, filter } = req.query;
        const key = search.trim() === "" ? search : filter;
        const searchResult = yield (0, search_1.searchCourseU)(search, filter, cloudService, dbRepositoryCourse);
        if (searchResult.length) {
            const cacheOptions = {
                key: `${key}`,
                expireTimeSec: 600,
                data: JSON.stringify(searchResult)
            };
            yield dbRepositoryCache.setCache(cacheOptions);
        }
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved courses based on the search query',
            data: searchResult
        });
    }));
    return {
        addCourse,
        editCourse,
        getAllCourses,
        getIndividualCourse,
        getCoursesByInstructor,
        addLesson,
        editLesson,
        getLessonsByCourse,
        getLessonById,
        getQuizzesByLesson,
        addDiscussion,
        getDiscussionsByLesson,
        editDiscussions,
        deleteDiscussion,
        replyDiscussion,
        getRepliesByDiscussion,
        enrollStudent,
        getRecommendedCourseByStudentInterest,
        getTrendingCourses,
        getCourseByStudent,
        searchCourse
    };
};
exports.default = courseController;
