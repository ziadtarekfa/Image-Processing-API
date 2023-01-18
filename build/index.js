"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
console.log("hello");
app.get('/images', (req, res) => {
    const width = req.query.width;
    const height = req.query.height;
    const fileName = req.query.filename;
    console.log(width + " " + height + " " + fileName);
    res.send("Helloclea hi");
});
app.listen(3000, () => {
    console.log("Listening my mohab");
});
