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
exports.paymentRepositoryMongodb = void 0;
const payment_1 = __importDefault(require("../models/payment"));
const paymentRepositoryMongodb = () => {
    const savePaymentInfo = (paymentInfo) => __awaiter(void 0, void 0, void 0, function* () {
        const newPaymentInfo = new payment_1.default(paymentInfo);
        const response = yield newPaymentInfo.save();
        return response;
    });
    const getMonthlyRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
        const currentMonth = new Date().getMonth() + 1;
        const pipeline = [
            {
                $match: {
                    $expr: {
                        $eq: [{ $month: '$createdAt' }, currentMonth]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$amount' }
                }
            }
        ];
        const revenue = yield payment_1.default.aggregate(pipeline);
        return revenue[0].totalAmount;
    });
    const getRevenueForEachMonth = () => __awaiter(void 0, void 0, void 0, function* () {
        const revenueByMonth = yield payment_1.default.aggregate([
            {
                $group: {
                    _id: {
                        $month: '$createdAt'
                    },
                    totalRevenue: { $sum: '$amount' }
                }
            },
            {
                $project: {
                    month: '$_id',
                    totalRevenue: 1,
                    _id: 0
                }
            },
            {
                $sort: {
                    month: 1
                }
            }
        ]);
        return revenueByMonth;
    });
    const getCoursesEnrolledPerMonth = () => __awaiter(void 0, void 0, void 0, function* () {
        const enrolled = yield payment_1.default.aggregate([
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
        return enrolled;
    });
    return {
        savePaymentInfo,
        getMonthlyRevenue,
        getRevenueForEachMonth,
        getCoursesEnrolledPerMonth
    };
};
exports.paymentRepositoryMongodb = paymentRepositoryMongodb;
