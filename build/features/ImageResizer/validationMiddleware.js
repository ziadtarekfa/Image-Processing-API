"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const validateInputs = (req, res, next) => {
    // let path: string;
    const fileName = req.query.filename;
    if (Number.isNaN(req.query.width) || Number.isNaN(req.query.height) || fileName == undefined) {
        res.status(400).send("The URL is not correctly formatted");
    }
    const width = +req.query.width;
    const height = +req.query.height;
    if (height <= 0 || width <= 0) {
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
        next();
    }
};
const checkIfFileNameExists = (fileName) => {
    const path = path_1.default.join(__dirname, `../images/${fileName}.jpg`);
    const fileNameExists = fs_1.default.existsSync(path);
    return fileNameExists;
};
exports.default = validateInputs;
