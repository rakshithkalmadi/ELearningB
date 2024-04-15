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
const category_1 = require("../../app/usecases/category");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const categoryController = (categoryDbRepository, categoryDbRepositoryImpl) => {
    const dbRepositoryCategory = categoryDbRepository(categoryDbRepositoryImpl());
    const addCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const category = req.body;
        yield (0, category_1.addCategoryU)(category, dbRepositoryCategory);
        res.status(200).json({
            status: 'success',
            message: 'Successfully added a new category',
            data: null
        });
    }));
    const getCategoryById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const categoryId = req.params.categoryId;
        const category = yield (0, category_1.getCategoryByIdU)(categoryId, dbRepositoryCategory);
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved a category by id',
            data: category
        });
    }));
    const getAllCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const categories = yield (0, category_1.getAllCategoryU)(dbRepositoryCategory);
        res.status(200).json({
            status: 'success',
            message: 'Successfully retrieved all categories',
            data: categories
        });
    }));
    const editCategory = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const categoryId = req.params.categoryId;
        const categoryInfo = req.body;
        yield (0, category_1.editCategoryU)(categoryId, categoryInfo, dbRepositoryCategory);
        res.status(200).json({
            status: 'success',
            message: 'Successfully edited the category',
            data: null
        });
    }));
    return {
        addCategory,
        getCategoryById,
        getAllCategory,
        editCategory
    };
};
exports.default = categoryController;
