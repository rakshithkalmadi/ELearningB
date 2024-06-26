"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const refreshTokenController_1 = __importDefault(require("../../../adapters/controllers/refreshTokenController"));
const refreshTokenDBRepository_1 = require("../../../app/repositories/refreshTokenDBRepository");
const refreshTokenRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/refreshTokenRepoMongoDb");
const authService_1 = require("../../../frameworks/services/authService");
const authServicesInterface_1 = require("../../../app/services/authServicesInterface");
const refreshRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, refreshTokenController_1.default)(authServicesInterface_1.authServiceInterface, authService_1.authService, refreshTokenDBRepository_1.refreshTokenDbRepository, refreshTokenRepoMongoDb_1.refreshTokenRepositoryMongoDB);
    router.post('/refresh', controller.refreshToken);
    return router;
};
exports.default = refreshRouter;
