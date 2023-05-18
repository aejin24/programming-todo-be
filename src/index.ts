import logger from "jet-logger";
import dotenv from "dotenv";

import sequelize from "./database/sequelize";
import server from "./server";

dotenv.config();

server.listen(process.env.NODE_PORT, async () => {
  try {
    await sequelize.authenticate().then(() => {
      logger.info("Sequelize Connection Success");
      logger.info(`Running on Coding Diary Server ${process.env.NODE_PORT}`);
    });
  } catch (error) {
    logger.err(new Error(error as string), true);
  }
});
