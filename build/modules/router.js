"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const validateInputs_1 = __importDefault(require("./validateInputs"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", validateInputs_1.default, (req, res) => {
    const thumbPath = path_1.default.join(__dirname, `../../images/thumbs/${res.locals.fileName}_${res.locals.width}_${res.locals.height}.jpg`);
    const imageExistsInCache = fs_1.default.existsSync(thumbPath);
    if (imageExistsInCache) {
        res.status(200).sendFile(thumbPath);
    }
    else {
        // Resize file and save it to cache
        const imagePath = path_1.default.join(__dirname, `../../images/${res.locals.fileName}.jpg`);
        (0, sharp_1.default)(imagePath)
            .resize(res.locals.width, res.locals.height)
            .toFile(`./images/thumbs/${res.locals.fileName}_${res.locals.width}_${res.locals.height}.jpg`, () => {
            res.status(200).sendFile(thumbPath);
        });
    }
});
exports.default = router;
