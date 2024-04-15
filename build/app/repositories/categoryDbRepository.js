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
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryDbInterface = void 0;
const categoryDbInterface = (repository) => {
    const addCategory = (category) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addCategory(category); });
    const getCategoryById = (categoryId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getCategoryById(categoryId); });
    const getAllCategory = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllCategory(); });
    const editCategory = (categoryId, categoryInfo) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.editCategory(categoryId, categoryInfo); });
    const getCourseCountByCategory = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getCourseCountByCategory(); });
    return {
        addCategory,
        getCategoryById,
        getAllCategory,
        editCategory,
        getCourseCountByCategory
    };
};
exports.categoryDbInterface = categoryDbInterface;
