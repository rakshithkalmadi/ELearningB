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
exports.searchCourseU = void 0;
const appError_1 = __importDefault(require("../../../utils/appError"));
const HttpStatusCodes_1 = __importDefault(require("../../../constants/HttpStatusCodes"));
const searchCourseU = (searchQuery, filterQuery, cloudService, courseDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!searchQuery && !filterQuery) {
        throw new appError_1.default('Please provide a search or filter query', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    let isFree = false;
    let searchParams;
    if (searchQuery) {
        // Check if the search query has the "free" prefix
        const freeRegex = /^free\s/i;
        const isFreeMatch = searchQuery.match(freeRegex);
        if (isFreeMatch) {
            isFree = true;
            searchParams = searchQuery.replace(freeRegex, '').trim();
        }
        else {
            searchParams = searchQuery;
        }
    }
    else {
        searchParams = filterQuery;
    }
    const searchResult = yield courseDbRepository.searchCourse(isFree, searchParams, filterQuery);
    yield Promise.all(searchResult.map((course) => __awaiter(void 0, void 0, void 0, function* () {
        if (course.thumbnail) {
            course.thumbnailUrl = yield cloudService.getFile(course.thumbnail.key);
        }
    })));
    return searchResult;
});
exports.searchCourseU = searchCourseU;
