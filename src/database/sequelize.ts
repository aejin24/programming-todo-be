import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE as string,
  process.env.MYSQL_USER as string,
  process.env.MYSQL_PASSWORD,
  {
    host: "localhost",
    port: 13306,
    dialect: "mysql",
    pool: { max: 30, min: 0, idle: 10000 },
    logging: false,
  }
);

export default sequelize;
