import dotenv from "dotenv";
import server from "./server";

dotenv.config();

server
  .listen(process.env.NODE_PORT, () =>
    console.log(`Running on Coding Diary Server ${process.env.NODE_PORT}`)
  )
  .on("error", (err) => {
    return new Error(`${err.name}: ${err.message}`);
  });
