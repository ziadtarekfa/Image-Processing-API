"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const validateInputs = (req, res, next) => {
    const width = +req.query.width;
    const height = +req.query.height;
    const fileName = req.query.filename;
    if (Number.isNaN(width) || Number.isNaN(height) || fileName == undefined) {
        res.status(400).send("The URL is not correctly formatted");
    }
    else if (height <= 0 || width <= 0) {
        res.status(400).send("Height and Width must be a positive number");
    }
    const imagePath = path_1.default.join(__dirname, `../../images/${fileName}.jpg`);
    const imageExists = fs_1.default.existsSync(imagePath);
    if (!imageExists) {
        res.status(404).send("Image does not exist");
    }
    else {
        res.locals.width = width;
        res.locals.height = height;
        res.locals.fileName = fileName;
        next();
    }
};
exports.default = validateInputs;
