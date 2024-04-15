"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const videoStreamController_1 = __importDefault(require("../../../adapters/controllers/videoStreamController"));
const s3CloudService_1 = require("../../../frameworks/services/s3CloudService");
const cloudServiceInterface_1 = require("../../../app/services/cloudServiceInterface");
const videoStreamRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, videoStreamController_1.default)(cloudServiceInterface_1.cloudServiceInterface, s3CloudService_1.s3Service);
    router.get('/stream-video/:videoFileId', controller.streamVideo);
    return router;
};
exports.default = videoStreamRouter;
