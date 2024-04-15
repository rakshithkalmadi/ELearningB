"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = __importDefault(require("../../../adapters/controllers/adminController"));
const adminRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/adminRepoMongoDb");
const adminDbRepository_1 = require("../../../app/repositories/adminDbRepository");
const courseReposMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/courseReposMongoDb");
const courseDbRepository_1 = require("../../../app/repositories/courseDbRepository");
const instructorDbRepository_1 = require("../../../app/repositories/instructorDbRepository");
const instructorRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/instructorRepoMongoDb");
const studentDbRepository_1 = require("../../../app/repositories/studentDbRepository");
const studentsRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/studentsRepoMongoDb");
const paymentDbRepository_1 = require("../../../app/repositories/paymentDbRepository");
const paymentRepoMongodb_1 = require("../../../frameworks/database/mongodb/repositories/paymentRepoMongodb");
const categoryDbRepository_1 = require("../../../app/repositories/categoryDbRepository");
const categoryRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/categoryRepoMongoDb");
const adminRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, adminController_1.default)(adminDbRepository_1.adminDbRepository, adminRepoMongoDb_1.adminRepoMongoDb, courseDbRepository_1.courseDbRepository, courseReposMongoDb_1.courseRepositoryMongodb, instructorDbRepository_1.instructorDbRepository, instructorRepoMongoDb_1.instructorRepoMongoDb, studentDbRepository_1.studentDbRepository, studentsRepoMongoDb_1.studentRepositoryMongoDB, paymentDbRepository_1.paymentInterface, paymentRepoMongodb_1.paymentRepositoryMongodb, categoryDbRepository_1.categoryDbInterface, categoryRepoMongoDb_1.categoryRepositoryMongodb);
    router.get("/dashboard-details", controller.getDashBoardDetails);
    router.get('/graph-data', controller.getGraphDetails);
    return router;
};
exports.default = adminRouter;
