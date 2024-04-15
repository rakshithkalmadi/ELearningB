"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const paymentService_1 = require("../../../frameworks/services/paymentService");
const paymentServiceInterface_1 = require("../../../app/services/paymentServiceInterface");
const paymentController_1 = __importDefault(require("../../../adapters/controllers/paymentController"));
const courseDbRepository_1 = require("../../../app/repositories/courseDbRepository");
const courseReposMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/courseReposMongoDb");
const paymentRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, paymentController_1.default)(paymentServiceInterface_1.paymentServiceInterface, paymentService_1.paymentService, courseDbRepository_1.courseDbRepository, courseReposMongoDb_1.courseRepositoryMongodb);
    router.get('/stripe/get-config', controller.getConfig);
    router.post('/stripe/create-payment-intent', controller.createPaymentIntent);
    return router;
};
exports.default = paymentRouter;
