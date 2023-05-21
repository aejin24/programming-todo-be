import sequelize from "database/sequelize";
import MemberModel from "./member";
import PlanModel from "./plan";

const DB = {
  sequelize,
  member: MemberModel(sequelize),
  plan: PlanModel(sequelize),
};

export default DB;
