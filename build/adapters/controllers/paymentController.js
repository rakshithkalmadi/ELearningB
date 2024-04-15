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
const stripe_1 = require("../../app/usecases/payment/stripe");
const paymentController = (paymentServiceInterface, paymentServiceImpl, courseDbInterface, courseDbImpl) => {
    const paymentService = paymentServiceInterface(paymentServiceImpl());
    const dbRepositoryCourse = courseDbInterface(courseDbImpl());
    const getConfig = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const config = (0, stripe_1.getConfigU)(paymentService);
        res.status(200).json({
            status: 'success',
            message: 'Successfully completed payment',
            data: config
        });
    }));
    const createPaymentIntent = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { courseId } = req.body;
        const response = yield (0, stripe_1.createPaymentIntentU)(courseId, dbRepositoryCourse, paymentService);
        const { client_secret } = response;
        res.status(200).json({
            status: 'success',
            message: 'Successfully completed payment',
            data: {
                clientSecret: client_secret
            }
        });
    }));
    return {
        getConfig,
        createPaymentIntent
    };
};
exports.default = paymentController;
