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
exports.getConfigU = exports.createPaymentIntentU = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../../utils/appError"));
const createPaymentIntentU = (courseId, courseDbRepository, paymentService) => __awaiter(void 0, void 0, void 0, function* () {
    if (!courseId) {
        throw new appError_1.default('Please provide valid payment information', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    const amount = yield courseDbRepository.getAmountByCourseId(courseId);
    let price;
    if (amount === null || amount === void 0 ? void 0 : amount.price) {
        price = amount === null || amount === void 0 ? void 0 : amount.price;
    }
    else {
        throw new appError_1.default('There is something wrong with the course', HttpStatusCodes_1.default.INTERNAL_SERVER_ERROR);
    }
    const response = yield paymentService.createPaymentIntent(price);
    return response;
});
exports.createPaymentIntentU = createPaymentIntentU;
const getConfigU = (paymentService) => paymentService.getConfig();
exports.getConfigU = getConfigU;
