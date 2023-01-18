import express from "express";
import fs from "fs";
import Path from "path";
import sharp from "sharp";
const app = express();

let path: string;
app.get('/images', (req: express.Request, res: express.Response) => {
    const width = (req.query.width as unknown) as number;
    const height = (req.query.height as unknown) as number;
    const fileName = req.query.filename as string;

    if (width == undefined || height == undefined || fileName == undefined) {
        res.send("The URL is not correctly formatted");
    }
    else if (height <= 0 || width <= 0) {
        res.send("Height and Width must be a positive number");
    }
    else if (!checkIfFileNameExists(fileName)) {
        res.send("Image does not exist");

    }
    // check if file exists in cache
    const thumbPath = Path.join(__dirname, `C:/Users/dell/OneDrive/Desktop/Image Processing API/images/thumbs/${fileName}_${width}_${height}.jpg`);
    console.log(thumbPath);
    const fileNameExists: boolean = fs.existsSync(thumbPath);

    console.log(thumbPath);
    if (fileNameExists) {
        res.sendFile(thumbPath);
    }
    else {
        // Resize file and save it to cache

        sharp(path).resize(320, 200).toFile(`./images/thumbs/${fileName}_${width}_${height}.jpg`, () => {
            console.log("save is successful");
        });


    }


});




const checkIfFileNameExists = (fileName: string): boolean => {
    path = Path.join(__dirname, `../images/${fileName}.jpg`);
    const fileNameExists: boolean = fs.existsSync(path);
    return fileNameExists;
}
async function saveFileToCache(fileName: string, width: number, height: number) {
    await sharp(path).resize(320, 200).toFormat('jpg').toFile(`../images/thumbs/${fileName}_${width}_${height}`, () => {
        console.log("save is successful");
    });
}

app.listen(3000, () => {
    console.log("Listening for requests");
});