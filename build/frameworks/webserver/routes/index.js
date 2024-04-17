"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = __importDefault(require("./auth"));
const admin_1 = __importDefault(require("./admin"));
const course_1 = __importDefault(require("./course"));
const instructor_1 = __importDefault(require("./instructor"));
const userAuth_1 = __importDefault(require("../middlewares/userAuth"));
const roleCheckMiddleware_1 = __importDefault(require("../middlewares/roleCheckMiddleware"));
const videoStream_1 = __importDefault(require("./videoStream"));
const refresh_1 = __importDefault(require("./refresh"));
const payment_1 = __importDefault(require("./payment"));
const category_1 = __importDefault(require("./category"));
const student_1 = __importDefault(require("./student"));
const routes = (app, redisClient) => {
    app.use('/api/auth', (0, auth_1.default)());
    app.use('/api/all/refresh-token', (0, refresh_1.default)());
    app.use('/api/admin', userAuth_1.default, (0, roleCheckMiddleware_1.default)('admin'), (0, admin_1.default)());
    app.use('/api/category', (0, category_1.default)());
    app.use('/api/courses', (0, course_1.default)(redisClient));
    app.use('/api/video-streaming', (0, videoStream_1.default)());
    app.use('/api/instructors', (0, instructor_1.default)());
    app.use('/api/payments', userAuth_1.default, (0, payment_1.default)());
    app.use('/api/students', (0, student_1.default)(redisClient));
};
exports.default = routes;
