"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./frameworks/database/mongodb/connection"));
const http_1 = __importDefault(require("http"));
const server_1 = __importDefault(require("./frameworks/webserver/server"));
const express_2 = __importDefault(require("./frameworks/webserver/express"));
const routes_1 = __importDefault(require("./frameworks/webserver/routes"));
const connection_2 = __importDefault(require("./frameworks/database/redis/connection"));
const colors_ts_1 = __importDefault(require("colors.ts"));
const errorHandling_1 = __importDefault(require("./frameworks/webserver/middlewares/errorHandling"));
const config_1 = __importDefault(require("./config"));
const appError_1 = __importDefault(require("./utils/appError"));
const socket_io_1 = require("socket.io");
const socket_1 = __importDefault(require("./frameworks/websocket/socket"));
const authService_1 = require("./frameworks/services/authService");
colors_ts_1.default === null || colors_ts_1.default === void 0 ? void 0 : colors_ts_1.default.enable();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
//* web socket connection
const io = new socket_io_1.Server(server, {
    cors: {
        origin: config_1.default.ORIGIN_PORT,
        methods: ["GET", "POST"]
    }
});
(0, socket_1.default)(io, (0, authService_1.authService)());
//* connecting mongoDb 
(0, connection_1.default)();
//* connection to redis
const redisClient = (0, connection_2.default)().createRedisClient();
//* express config connection
(0, express_2.default)(app);
//* routes for each endpoint
(0, routes_1.default)(app, redisClient);
//* handles server side errors
app.use(errorHandling_1.default);
//* catch 404 and forward to error handler
app.all('*', (req, res, next) => {
    next(new appError_1.default('Not found', 404));
});
//* starting the server with server config
(0, server_1.default)(server).startServer();
