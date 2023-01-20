import express from "express";
import fs from "fs";
import Path from "path";

const validateInputs = (req: express.Request, res: express.Response, next: express.NextFunction): void => {

    const width: number = +(req.query.width as string);
    const height: number = +(req.query.height as string);
    const fileName = req.query.filename as string;

    if (Number.isNaN(width) || Number.isNaN(height) || fileName == undefined) {
        res.status(400).send("The URL is not correctly formatted");
        return;
    }
    else if (height <= 0 || width <= 0) {
        res.status(400).send("Height and Width must be a positive number");
        return;
    }

    const imagePath = Path.join(__dirname, `../../images/${fileName}.jpg`);
    const imageExists: boolean = fs.existsSync(imagePath);

    if (!imageExists) {
        res.status(404).send("Image does not exist");
    }
    else {
        res.locals.width = width;
        res.locals.height = height;
        res.locals.fileName = fileName
        next();
    }
}

export default validateInputs;