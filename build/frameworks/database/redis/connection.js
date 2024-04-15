"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../../config"));
const redis_1 = require("redis");
const connection = () => {
    const createRedisClient = () => {
        const client = (0, redis_1.createClient)({
            url: config_1.default.REDIS_URL,
        });
        // const client = createClient();
        client.on('error', err => console.log('Redis Client Error', err));
        client.connect().then(() => {
            console.log("Redis connected successfully".bg_red.bold);
        }).catch((err) => {
            console.log(err);
        });
        return client;
    };
    return {
        createRedisClient
    };
};
exports.default = connection;
