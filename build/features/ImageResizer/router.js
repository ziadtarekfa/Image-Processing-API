"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const validationMiddleware_1 = __importDefault(require("./validationMiddleware"));
const router = (0, express_1.Router)();
router.get("/", validationMiddleware_1.default, (req, res) => {
    const width = +req.query.width;
    const height = +req.query.height;
    const fileName = req.query.filename;
    const path = path_1.default.join(__dirname, `../images/${fileName}.jpg`);
    const thumbPath = path_1.default.join(__dirname, `../images/thumbs/${fileName}_${width}_${height}.jpg`);
    // Resize file and save it to cache
    (0, sharp_1.default)(path)
        .resize(width, height)
        .toFile(`./images/thumbs/${fileName}_${width}_${height}.jpg`, () => {
        res.status(200).sendFile(thumbPath);
    });
});
exports.default = router;
