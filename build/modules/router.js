"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const validateInputs_1 = __importDefault(require("./validateInputs"));
const express_1 = require("express");
const resizeImage_1 = __importDefault(require("./resizeImage"));
const router = (0, express_1.Router)();
router.get("/", validateInputs_1.default, (req, res) => {
    const thumbPath = path_1.default.join(__dirname, `../../images/thumbs/${res.locals.fileName}_${res.locals.width}_${res.locals.height}.jpg`);
    const imageExistsInCache = fs_1.default.existsSync(thumbPath);
    if (imageExistsInCache) {
        res.status(200).sendFile(thumbPath);
    }
    else {
        (0, resizeImage_1.default)(res.locals.fileName, res.locals.width, res.locals.height).then(() => {
            res.status(200).sendFile(thumbPath);
        });
    }
});
exports.default = router;
