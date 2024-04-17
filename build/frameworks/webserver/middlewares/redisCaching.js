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
exports.cachingMiddleware = void 0;
function cachingMiddleware(redisClient, key) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const { search, filter } = req.query;
            const searchKey = (_b = (_a = search !== null && search !== void 0 ? search : filter) !== null && _a !== void 0 ? _a : key) !== null && _b !== void 0 ? _b : (_c = req.user) === null || _c === void 0 ? void 0 : _c.Id;
            if (!searchKey) {
                // If both search, filter, and key are not present in query and params
                return next();
            }
            const data = yield redisClient.get(searchKey);
            if (!data) {
                return next();
            }
            else {
                res.json({ data: JSON.parse(data) });
            }
        });
    };
}
exports.cachingMiddleware = cachingMiddleware;
