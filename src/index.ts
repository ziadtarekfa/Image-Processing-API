import express from "express";
import fs from "fs";
import Path from "path";
const app = express();


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


});

const checkIfFileNameExists = (fileName: string): boolean => {
    const path = Path.join(__dirname, `../images/${fileName}.jpg`);
    const fileNameExists: boolean = fs.existsSync(path);

    return fileNameExists;
}

app.listen(3000, () => {
    console.log("Listening for requests");
});