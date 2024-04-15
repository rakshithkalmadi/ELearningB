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
exports.redisCacheRepository = void 0;
function redisCacheRepository(redisClient) {
    const setCache = (_a) => __awaiter(this, [_a], void 0, function* ({ key, expireTimeSec, data }) { return yield redisClient.setEx(key, expireTimeSec, data); });
    const clearCache = (key) => __awaiter(this, void 0, void 0, function* () {
        const result = yield redisClient.del(key);
        return result === 1;
    });
    const populateTrie = (course) => __awaiter(this, void 0, void 0, function* () {
        const trie = {}; // Initialize the trie object
        const title = course.title.toLowerCase();
        let currentNode = trie;
        for (const char of title) {
            if (!currentNode[char]) {
                currentNode[char] = {}; // Create a child node for the character
            }
            currentNode = currentNode[char]; // Move to the next node
        }
        currentNode['*'] = course.title; // Mark the end of the course title with '*'
        redisClient.set('course-trie', JSON.stringify(trie)); // Store the trie in Redis
    });
    return {
        setCache,
        clearCache,
        populateTrie
    };
}
exports.redisCacheRepository = redisCacheRepository;
