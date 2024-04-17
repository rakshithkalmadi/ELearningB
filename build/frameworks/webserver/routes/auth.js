"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentDbRepository_1 = require("../../../app/repositories/studentDbRepository");
const studentsRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/studentsRepoMongoDb");
const authController_1 = __importDefault(require("../../../adapters/controllers/authController"));
const authServicesInterface_1 = require("../../../app/services/authServicesInterface");
const authService_1 = require("../../services/authService");
const googleAuthService_1 = require("../../../frameworks/services/googleAuthService");
const googleAuthServicesInterface_1 = require("../../../app/services/googleAuthServicesInterface");
const instructorDbRepository_1 = require("../../../app/repositories/instructorDbRepository");
const instructorRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/instructorRepoMongoDb");
const adminDbRepository_1 = require("../../../app/repositories/adminDbRepository");
const adminRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/adminRepoMongoDb");
const refreshTokenDBRepository_1 = require("../../../app/repositories/refreshTokenDBRepository");
const refreshTokenRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb");
const s3CloudService_1 = require("../../../frameworks/services/s3CloudService");
const cloudServiceInterface_1 = require("../../../app/services/cloudServiceInterface");
const multer_1 = __importDefault(require("../middlewares/multer"));
const authRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, authController_1.default)(authServicesInterface_1.authServiceInterface, authService_1.authService, cloudServiceInterface_1.cloudServiceInterface, s3CloudService_1.s3Service, studentDbRepository_1.studentDbRepository, studentsRepoMongoDb_1.studentRepositoryMongoDB, instructorDbRepository_1.instructorDbRepository, instructorRepoMongoDb_1.instructorRepoMongoDb, googleAuthServicesInterface_1.googleAuthServiceInterface, googleAuthService_1.googleAuthService, adminDbRepository_1.adminDbRepository, adminRepoMongoDb_1.adminRepoMongoDb, refreshTokenDBRepository_1.refreshTokenDbRepository, refreshTokenRepoMongoDb_1.refreshTokenRepositoryMongoDB);
    //* Student
    router.post("/student-register", controller.registerStudent);
    router.post("/student-login", controller.loginStudent);
    router.post("/login-with-google", controller.loginWithGoogle);
    //* Instructor
    router.post("/instructor/instructor-register", multer_1.default.array('images'), controller.registerInstructor);
    router.post("/instructor/instructor-login", controller.loginInstructor);
    //* Admin 
    router.post("/admin/admin-login", controller.loginAdmin);
    return router;
};
exports.default = authRouter;
