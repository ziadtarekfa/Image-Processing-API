import express from "express";
import fs from "fs";
import Path from "path";
import validateInputs from "./validateInputs";
import { Router } from "express";
import resizeImage from "./resizeImage";

const router = Router();

router.get("/", validateInputs, (req: express.Request, res: express.Response): void => {

    const thumbPath = Path.join(__dirname,
        `../../images/thumbs/${res.locals.fileName}_${res.locals.width}_${res.locals.height}.jpg`);
    const imageExistsInCache: boolean = fs.existsSync(thumbPath);

    if (imageExistsInCache) {
        res.status(200).sendFile(thumbPath);
    }
    else {
        resizeImage(res.locals.fileName, res.locals.width, res.locals.height).then(() => {
            res.status(200).sendFile(thumbPath);
        });
    }

});

export default router;