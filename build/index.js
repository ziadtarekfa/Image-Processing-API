"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const app = (0, express_1.default)();
let path;
app.get('/images', (req, res) => {
    const width = +req.query.width;
    const height = +req.query.height;
    console.log("type is " + typeof (width));
    const fileName = req.query.filename;
    if (Number.isNaN(width) || Number.isNaN(height) || fileName == undefined) {
        res.status(400).send("The URL is not correctly formatted");
    }
    else if (height <= 0 || width <= 0) {
        res.status(400).send("Height and Width must be a positive number");
    }
    else if (!checkIfFileNameExists(fileName)) {
        res.status(404).send("Image does not exist");
    }
    // check if file exists in cache
    const thumbPath = path_1.default.join(__dirname, `../images/thumbs/${fileName}_${width}_${height}.jpg`);
    const fileNameExists = fs_1.default.existsSync(thumbPath);
    if (fileNameExists) {
        res.sendFile(thumbPath);
    }
    else {
        // Resize file and save it to cache
        (0, sharp_1.default)(path).resize(width, height).toFile(`./images/thumbs/${fileName}_${width}_${height}.jpg`, () => {
            res.status(200).sendFile(thumbPath);
        });
    }
});
const checkIfFileNameExists = (fileName) => {
    path = path_1.default.join(__dirname, `../images/${fileName}.jpg`);
    const fileNameExists = fs_1.default.existsSync(path);
    return fileNameExists;
};
app.listen(3000, () => {
    console.log("Listening for requests");
});
exports.default = app;
