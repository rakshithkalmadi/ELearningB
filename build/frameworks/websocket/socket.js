"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../../utils/appError"));
const HttpStatusCodes_1 = __importDefault(require("../../constants/HttpStatusCodes"));
const socketConfig = (io, authService) => {
    io.use((socket, next) => {
        if (socket.handshake.query && socket.handshake.query.token) {
            const res = authService.verifyToken(socket.handshake.query.token);
            socket.data.userId = res.payload;
            next();
        }
        else {
            next(new appError_1.default('Authentication token not provided', HttpStatusCodes_1.default.UNAUTHORIZED));
        }
    }).on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`.bg_magenta);
        // sendProgress();
        socket.on('request_data', () => {
            // Process your data retrieval logic here
            const data = { message: 'Hello from the server!' };
            // Emit a custom event with the data
            socket.emit('response_data', data);
        });
        socket.on('join_room', (courseId) => {
            socket.join(courseId);
            console.log(`User ${socket.id} joined room ${courseId}`);
        });
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};
exports.default = socketConfig;
