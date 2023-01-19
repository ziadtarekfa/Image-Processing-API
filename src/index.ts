import express from "express";
import fs from "fs";
import Path from "path";
import sharp from "sharp";
const app = express();

let path: string;
app.get('/images', (req: express.Request, res: express.Response) => {
    const width: number = +(req.query.width as string);
    const height: number = +(req.query.height as string);
    console.log("type is " + typeof (width));
    const fileName = req.query.filename as string;

    if (Number.isNaN(width) || Number.isNaN(height) || fileName == undefined) {
        res.send("The URL is not correctly formatted");
    }
    else if (height <= 0 || width <= 0) {
        res.send("Height and Width must be a positive number");
    }
    else if (!checkIfFileNameExists(fileName)) {
        res.send("Image does not exist");
    }
    // check if file exists in cache
    const thumbPath = Path.join(__dirname, `../images/thumbs/${fileName}_${width}_${height}.jpg`);
    const fileNameExists: boolean = fs.existsSync(thumbPath);

    if (fileNameExists) {
        res.sendFile(thumbPath);
    }
    else {
        // Resize file and save it to cache
        sharp(path).resize(width, height).toFile(`./images/thumbs/${fileName}_${width}_${height}.jpg`, () => {
            res.sendFile(thumbPath);
        });

    }


});




const checkIfFileNameExists = (fileName: string): boolean => {
    path = Path.join(__dirname, `../images/${fileName}.jpg`);
    const fileNameExists: boolean = fs.existsSync(path);
    return fileNameExists;
}

app.listen(3000, () => {
    console.log("Listening for requests");
});