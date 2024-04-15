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
exports.getGraphDetailsU = exports.getDashBoardDetailsU = void 0;
const getDashBoardDetailsU = (dbRepositoryCourse, dbRepositoryInstructor, dbRepositoryStudent, dbRepositoryPayment) => __awaiter(void 0, void 0, void 0, function* () {
    const [numberOfCourses, numberInstructors, numberOfStudents, monthlyRevenue] = yield Promise.allSettled([
        dbRepositoryCourse.getTotalNumberOfCourses(),
        dbRepositoryInstructor.getTotalNumberOfInstructors(),
        dbRepositoryStudent.getTotalNumberOfStudents(),
        dbRepositoryPayment.getMonthlyRevenue()
    ]);
    return {
        numberOfCourses: numberOfCourses.status === 'fulfilled' ? numberOfCourses.value : null,
        numberInstructors: numberInstructors.status === 'fulfilled' ? numberInstructors.value : null,
        numberOfStudents: numberOfStudents.status === 'fulfilled' ? numberOfStudents.value : null,
        monthlyRevenue: monthlyRevenue.status === 'fulfilled' ? monthlyRevenue.value : null
    };
});
exports.getDashBoardDetailsU = getDashBoardDetailsU;
const getGraphDetailsU = (dbRepositoryCourse, dbRepositoryCategory, dbRepositoryPayment) => __awaiter(void 0, void 0, void 0, function* () {
    const [trendingCourses, courseByCategory, revenueForEachMonth, coursesAdded, coursesEnrolled] = yield Promise.allSettled([
        dbRepositoryCourse.getTrendingCourse(),
        dbRepositoryCategory.getCourseCountByCategory(),
        dbRepositoryPayment.getRevenueForEachMonth(),
        dbRepositoryCourse.getNumberOfCoursesAddedInEachMonth(),
        dbRepositoryPayment.getCoursesEnrolledPerMonth()
    ]);
    let trending = [];
    if (trendingCourses.status === 'fulfilled') {
        trendingCourses.value.map((course) => {
            var _a;
            trending.push({
                title: course === null || course === void 0 ? void 0 : course.title,
                enrolled: (_a = course.coursesEnrolled) === null || _a === void 0 ? void 0 : _a.length
            });
        });
    }
    let revenueData = [];
    if (revenueForEachMonth.status === 'fulfilled' &&
        coursesAdded.status === 'fulfilled' &&
        coursesEnrolled.status === 'fulfilled') {
        const allMonths = Array.from({ length: 12 }, (_, index) => index + 1);
        const monthNames = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];
        revenueData = allMonths.map((month) => {
            const matchedRevenueMonth = revenueForEachMonth.value.find((data) => data.month === month);
            const matchedAddedMonth = coursesAdded.value.find((data) => data.month === month);
            const matchedEnrolledMonth = coursesEnrolled.value.find((data) => data.month === month);
            return {
                month: monthNames[month - 1],
                revenue: matchedRevenueMonth ? matchedRevenueMonth.totalRevenue : 0,
                coursesAdded: matchedAddedMonth ? matchedAddedMonth.count : 0,
                coursesEnrolled: matchedEnrolledMonth ? matchedEnrolledMonth.count : 0
            };
        });
    }
    return {
        revenue: revenueData,
        trendingCourses: trending,
        courseByCategory: courseByCategory.status === 'fulfilled' ? courseByCategory.value : null
    };
});
exports.getGraphDetailsU = getGraphDetailsU;
