import express from "express";
import router from "./modules/router";

const app = express();

app.use('/images', router);

app.listen(3000, (): void => {
  console.log("Listening for requests");
});

export default app;
