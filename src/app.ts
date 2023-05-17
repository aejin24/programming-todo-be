import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app
  .listen(process.env.NODE_PORT, () =>
    console.log("Running on TS-Express Server")
  )
  .on("error", (err) => {
    return new Error(`${err.name}: ${err.message}`);
  });
