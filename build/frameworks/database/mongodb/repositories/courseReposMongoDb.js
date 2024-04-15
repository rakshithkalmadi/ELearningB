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
exports.courseRepositoryMongodb = void 0;
const course_1 = __importDefault(require("../models/course"));
const mongoose_1 = __importDefault(require("mongoose"));
const student_1 = __importDefault(require("../models/student"));
const courseRepositoryMongodb = () => {
    const addCourse = (courseInfo) => __awaiter(void 0, void 0, void 0, function* () {
        const newCourse = new course_1.default(courseInfo);
        newCourse.price ? (newCourse.isPaid = true) : (newCourse.isPaid = false);
        const { _id: courseId } = yield newCourse.save();
        return courseId;
    });
    const editCourse = (courseId, editInfo) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield course_1.default.findOneAndUpdate({ _id: new mongoose_1.default.Types.ObjectId(courseId) }, Object.assign({}, editInfo));
        return response;
    });
    const getAllCourse = () => __awaiter(void 0, void 0, void 0, function* () {
        const courses = yield course_1.default.find({});
        return courses;
    });
    const getCourseById = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        const course = yield course_1.default.findOne({
            _id: new mongoose_1.default.Types.ObjectId(courseId)
        }).lean();
        return course;
    });
    const getCourseByInstructorId = (instructorId) => __awaiter(void 0, void 0, void 0, function* () {
        const courses = yield course_1.default.find({
            instructorId: new mongoose_1.default.Types.ObjectId(instructorId)
        });
        return courses;
    });
    const getAmountByCourseId = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
        const amount = yield course_1.default.findOne({ _id: new mongoose_1.default.Types.ObjectId(courseId) }, { price: 1 });
        return amount;
    });
    const enrollStudent = (courseId, studentId) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield course_1.default.updateOne({ _id: new mongoose_1.default.Types.ObjectId(courseId) }, { $push: { coursesEnrolled: studentId } });
        return response;
    });
    const getRecommendedCourseByStudentInterest = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
        const pipeline = [
            { $match: { _id: new mongoose_1.default.Types.ObjectId(studentId) } },
            { $unwind: '$interests' },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'interests',
                    foreignField: 'name',
                    as: 'category'
                }
            },
            { $unwind: '$category' },
            {
                $lookup: {
                    from: 'course',
                    localField: 'category.name',
                    foreignField: 'category',
                    as: 'courses'
                }
            },
            { $unwind: '$courses' },
            {
                $lookup: {
                    from: 'instructor',
                    localField: 'courses.instructorId',
                    foreignField: '_id',
                    as: 'instructor'
                }
            },
            {
                $addFields: {
                    instructor: { $arrayElemAt: ['$instructor', 0] }
                }
            },
            {
                $project: {
                    course: {
                        _id: '$courses._id',
                        name: '$courses.title',
                        thumbnailKey: '$courses.thumbnail.key'
                    },
                    instructor: {
                        _id: '$instructor._id',
                        firstName: '$instructor.firstName',
                        lastName: '$instructor.lastName',
                        email: '$instructor.email',
                        profileKey: '$instructor.profilePic.key'
                    }
                }
            }
        ];
        const courses = yield student_1.default.aggregate(pipeline);
        return courses;
    });
    const getTrendingCourses = () => __awaiter(void 0, void 0, void 0, function* () {
        const courses = yield course_1.default.aggregate([
            {
                $sort: { enrolledCount: -1 }
            },
            {
                $limit: 10
            },
            {
                $lookup: {
                    from: 'instructor',
                    localField: 'instructorId',
                    foreignField: '_id',
                    as: 'instructor'
                }
            },
            {
                $project: {
                    title: '$title',
                    coursesEnrolled: '$coursesEnrolled',
                    thumbnail: '$thumbnail',
                    instructorFirstName: { $arrayElemAt: ['$instructor.firstName', 0] },
                    instructorLastName: { $arrayElemAt: ['$instructor.lastName', 0] },
                    instructorProfile: { $arrayElemAt: ['$instructor.profilePic', 0] },
                    profileUrl: ''
                }
            }
        ]);
        return courses;
    });
    const getCourseByStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const courses = yield course_1.default.find({
            coursesEnrolled: {
                $in: [new mongoose_1.default.Types.ObjectId(id)]
            }
        });
        return courses;
    });
    const getTotalNumberOfCourses = () => __awaiter(void 0, void 0, void 0, function* () {
        const totalCourses = yield course_1.default.find().count();
        return totalCourses;
    });
    const getNumberOfCoursesAddedInEachMonth = () => __awaiter(void 0, void 0, void 0, function* () {
        const courseCountsByMonth = yield course_1.default.aggregate([
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    month: '$_id',
                    count: 1,
                    _id: 0
                }
            },
            {
                $sort: {
                    month: 1
                }
            }
        ]);
        return courseCountsByMonth;
    });
    const getStudentsByCourseForInstructor = (instructorId) => __awaiter(void 0, void 0, void 0, function* () {
        const students = yield course_1.default.aggregate([
            {
                $match: { instructorId: new mongoose_1.default.Types.ObjectId(instructorId) }
            },
            {
                $unwind: '$coursesEnrolled'
            },
            {
                $lookup: {
                    from: 'students',
                    localField: 'coursesEnrolled',
                    foreignField: '_id',
                    as: 'studentDetails'
                }
            },
            {
                $project: {
                    student: { $arrayElemAt: ['$studentDetails', 0] },
                    courseName: '$title'
                }
            },
            {
                $group: {
                    _id: '$student._id',
                    course: { $first: '$courseName' },
                    firstName: { $first: '$student.firstName' },
                    lastName: { $first: '$student.lastName' },
                    email: { $first: '$student.email' },
                    mobile: { $first: '$student.mobile' },
                    dateJoined: { $first: '$student.dateJoined' },
                    isBlocked: { $first: '$student.isBlocked' },
                    profilePic: { $first: '$student.profilePic' },
                    isGoogleUser: { $first: '$student.isGoogleUser' }
                }
            }
        ]);
        return students;
    });
    const searchCourse = (isFree, searchQuery, filterQuery) => __awaiter(void 0, void 0, void 0, function* () {
        let query = {};
        if (searchQuery && filterQuery) {
            query = {
                $and: [
                    { $text: { $search: searchQuery } },
                    { isFree: isFree },
                ],
            };
        }
        else if (searchQuery) {
            query = { $text: { $search: searchQuery } };
        }
        else if (filterQuery) {
            query = { isFree: isFree };
        }
        const courses = yield course_1.default.find(query, {
            score: { $meta: "textScore" },
        }).sort({ score: { $meta: "textScore" } });
        return courses;
    });
    return {
        addCourse,
        editCourse,
        getAllCourse,
        getCourseById,
        getCourseByInstructorId,
        getAmountByCourseId,
        enrollStudent,
        getRecommendedCourseByStudentInterest,
        getTrendingCourses,
        getCourseByStudent,
        getTotalNumberOfCourses,
        getNumberOfCoursesAddedInEachMonth,
        getStudentsByCourseForInstructor,
        searchCourse
    };
};
exports.courseRepositoryMongodb = courseRepositoryMongodb;
