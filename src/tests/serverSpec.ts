import supertest from "supertest";
import resizeImage from "../modules/resizeImage";
import app from "../server";
import Path from "path";
import { existsSync, unlinkSync } from "fs";

const request = supertest(app);

describe("validate inputs", () => {
  it("checks if image exists", async () => {
    const response = await request.get("/images/?width=200&height=100&filename=fjord");
    expect(response.status).toEqual(200);
  });
  it("checks if image doesn't exist", async () => {
    const response = await request.get("/images/?width=200&height=100&filename=fadad");
    expect(response.status).toEqual(404);
  });
  it("checks if all inputs are provided", async () => {
    const response = await request.get("/images/?width=200&height=10");
    expect(response.status).toEqual(400);
  });
  it("checks if height and width are in the correct range", async () => {
    const response = await request.get("/images/?width=-20&height=100&filename=fadad");
    expect(response.status).toEqual(400);
  });
});

it("checks if the resizing functionality work", async () => {

  const thumbPath = Path.join(__dirname, `../../images/thumbs/palmtunnel_200_200.jpg`);
  if (existsSync(thumbPath)) {
    unlinkSync(thumbPath);
  }
  const imagePath = Path.join(__dirname, `../../images/palmtunnel.jpg`);
  resizeImage("palmtunnel", 200, 200).then(() => {
    expect(existsSync(imagePath)).toBeTrue();
  })
});
