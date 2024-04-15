"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configKeys = {
    MONGO_DB_URL: process.env.DATABASE,
    PORT: process.env.PORT,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    ORIGIN_PORT: process.env.ORIGIN_PORT,
    EMAIL_NODE_MAILER: process.env.EMAIL_USERNAME,
    PASSWORD_NODE_MAILER: process.env.EMAIL_PASSWORD,
    FROM_EMAIL_NODE_MAILER: process.env.FROM_EMAIL,
    AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
    AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
    CLOUDFRONT_DISTRIBUTION_ID: process.env.CLOUDFRONT_DISTRIBUTION_ID,
    CLOUDFRONT_DOMAIN_NAME: process.env.CLOUDFRONT_DOMAIN_NAME,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY,
    DB_CLUSTER_URL: process.env.DB_CLUSTER_URL,
    REDIS_URL: process.env.REDIS_URL
};
exports.default = configKeys;
