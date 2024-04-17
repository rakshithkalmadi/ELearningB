"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const instructorRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/instructorRepoMongoDb");
const sendEmailServiceInterface_1 = require("../../../app/services/sendEmailServiceInterface");
const sendEmailService_1 = require("../../../frameworks/services/sendEmailService");
const instructorDbRepository_1 = require("../../../app/repositories/instructorDbRepository");
const instructorController_1 = __importDefault(require("../../../adapters/controllers/instructorController"));
const authService_1 = require("../../../frameworks/services/authService");
const authServicesInterface_1 = require("../../../app/services/authServicesInterface");
const cloudServiceInterface_1 = require("../../../app/services/cloudServiceInterface");
const s3CloudService_1 = require("../../../frameworks/services/s3CloudService");
const roleCheckMiddleware_1 = __importDefault(require("../middlewares/roleCheckMiddleware"));
const userAuth_1 = __importDefault(require("../middlewares/userAuth"));
const multer_1 = __importDefault(require("../middlewares/multer"));
const courseDbRepository_1 = require("../../../app/repositories/courseDbRepository");
const courseReposMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/courseReposMongoDb");
const instructorRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, instructorController_1.default)(authServicesInterface_1.authServiceInterface, authService_1.authService, instructorDbRepository_1.instructorDbRepository, instructorRepoMongoDb_1.instructorRepoMongoDb, courseDbRepository_1.courseDbRepository, courseReposMongoDb_1.courseRepositoryMongodb, sendEmailServiceInterface_1.sendEmailServiceInterface, sendEmailService_1.sendEmailService, cloudServiceInterface_1.cloudServiceInterface, s3CloudService_1.s3Service);
    //* Instructor management
    router.get('/view-instructor-requests', controller.getInstructorRequests);
    router.patch('/accept-instructor-request/:instructorId', controller.verifyInstructor);
    router.put('/reject-instructor-request', controller.rejectRequest);
    router.get('/get-all-instructors', controller.getAllInstructor);
    router.patch('/get-all-instructors/block-instructors', controller.blockInstructor);
    router.patch('/get-all-instructors/unblock-instructors/:instructorId', controller.unblockInstructor);
    router.get('/get-blocked-instructors', controller.getBlockedInstructor);
    router.get('/view-instructor/:instructorId', controller.getInstructorById);
    router.get('/get-instructor-details', userAuth_1.default, (0, roleCheckMiddleware_1.default)('instructor'), controller.getInstructorDetails);
    router.put('/update-profile', userAuth_1.default, multer_1.default.single('image'), (0, roleCheckMiddleware_1.default)('instructor'), controller.updateProfile);
    router.patch('/change-password', userAuth_1.default, (0, roleCheckMiddleware_1.default)('instructor'), controller.changePassword);
    router.get('/get-students-by-instructor', userAuth_1.default, controller.getStudentsForInstructors);
    return router;
};
exports.default = instructorRouter;
