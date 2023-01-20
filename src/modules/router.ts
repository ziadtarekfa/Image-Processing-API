import express from "express";
import fs from "fs";
import Path from "path";
import sharp from "sharp";
import validateInputs from "./validateInputs";
import { Router } from "express";

const router = Router();

router.get("/", validateInputs, (req: express.Request, res: express.Response): void => {

    const thumbPath = Path.join(__dirname,
        `../../images/thumbs/${res.locals.fileName}_${res.locals.width}_${res.locals.height}.jpg`);
    const imageExistsInCache: boolean = fs.existsSync(thumbPath);

    if (imageExistsInCache) {
        res.status(200).sendFile(thumbPath);
    }
    else {
        // Resize file and save it to cache
        const imagePath = Path.join(__dirname, `../../images/${res.locals.fileName}.jpg`);
        sharp(imagePath)
            .resize(res.locals.width, res.locals.height)
            .toFile(`./images/thumbs/${res.locals.fileName}_${res.locals.width}_${res.locals.height}.jpg`, () => {
                res.status(200).sendFile(thumbPath);
            });
    }

});

export default router;