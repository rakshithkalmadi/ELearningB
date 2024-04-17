"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const config_1 = __importDefault(require("../../config"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // maximum requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    keyGenerator: (req) => {
        const xRealIp = req.headers['x-real-ip'];
        return xRealIp ? String(xRealIp) : req.ip;
    }
});
const expressConfig = (app) => {
    // Development logging
    if (config_1.default.NODE_ENV === 'development') {
        app.use((0, morgan_1.default)('dev'));
    }
    app.set('trust proxy', true); // Enable trust for X-Forwarded-* headers
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use((0, cookie_parser_1.default)());
    app.use(limiter);
    app.use(helmet_1.default.contentSecurityPolicy({
        directives: {
            imgSrc: ["'self'", 'data:'],
            frameSrc: ["'self'", 'https:']
        }
    }));
    app.use((0, express_mongo_sanitize_1.default)());
};
exports.default = expressConfig;
