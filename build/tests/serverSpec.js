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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
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
    const response = yield request.get("/images/?width=300&height=100&filename=fjord");
    expect(response.status).toEqual(200);
}));
