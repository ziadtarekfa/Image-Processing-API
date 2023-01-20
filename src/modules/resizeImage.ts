import sharp from "sharp";
import Path from "path";
const resizeImage = async (fileName: string, width: number, height: number): Promise<void> => {

    const imagePath = Path.join(__dirname, `../../images/${fileName}.jpg`);

    await sharp(imagePath)
        .resize(width, height)
        .toFile(`./images/thumbs/${fileName}_${width}_${height}.jpg`);
}

export default resizeImage;