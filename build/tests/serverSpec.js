"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const supertest_1 = __importDefault(require("supertest"));
const resizeImage_1 = __importDefault(require("../modules/resizeImage"));
const server_1 = __importDefault(require("../server"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importStar(require("fs"));
const request = (0, supertest_1.default)(server_1.default);
describe("validate inputs", () => {
    it("checks if image exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/images/?width=200&height=100&filename=fjord");
        expect(response.status).toEqual(200);
    }));
    it("checks if image doesn't exist", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/images/?width=200&height=100&filename=fadad");
        expect(response.status).toEqual(404);
    }));
    it("checks if all inputs are provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/images/?width=200&height=10");
        expect(response.status).toEqual(400);
    }));
    it("checks if height and width are in the correct range", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/images/?width=-20&height=100&filename=fadad");
        expect(response.status).toEqual(400);
    }));
});
it("checks if the resizing functionality work", () => __awaiter(void 0, void 0, void 0, function* () {
    const thumbPath = path_1.default.join(__dirname, `../../images/thumbs/palmtunnel_200_200.jpg`);
    if ((0, fs_1.existsSync)(thumbPath)) {
        fs_1.default.unlinkSync(thumbPath);
    }
    const imagePath = path_1.default.join(__dirname, `../../images/palmtunnel.jpg`);
    (0, resizeImage_1.default)("palmtunnel", 200, 200).then(() => {
        expect((0, fs_1.existsSync)(imagePath)).toBeTrue();
    });
}));
