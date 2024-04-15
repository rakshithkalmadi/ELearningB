"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = __importDefault(require("../../../adapters/controllers/categoryController"));
const categoryDbRepository_1 = require("../../../app/repositories/categoryDbRepository");
const categoryRepoMongoDb_1 = require("../../../frameworks/database/mongodb/repositories/categoryRepoMongoDb");
const categoryRouter = () => {
    const router = express_1.default.Router();
    const controller = (0, categoryController_1.default)(categoryDbRepository_1.categoryDbInterface, categoryRepoMongoDb_1.categoryRepositoryMongodb);
    router.post('/add-category', controller.addCategory);
    router.get('/get-category/:categoryId', controller.getCategoryById);
    router.get('/get-all-categories', controller.getAllCategory);
    router.put('/edit-category/:categoryId', controller.editCategory);
    return router;
};
exports.default = categoryRouter;
