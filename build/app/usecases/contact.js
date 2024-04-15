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
exports.addContactU = void 0;
const HttpStatusCodes_1 = __importDefault(require("../../constants/HttpStatusCodes"));
const appError_1 = __importDefault(require("../../utils/appError"));
const addContactU = (contactInfo, contactDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!contactInfo) {
        throw new appError_1.default('Please provide valid data', HttpStatusCodes_1.default.BAD_REQUEST);
    }
    yield contactDbRepository.addContact(contactInfo);
});
exports.addContactU = addContactU;
