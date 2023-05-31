import { DataTypes, Model, Sequelize } from "sequelize";
import { TPlan } from "types/plan";

class PlanModel extends Model<TPlan> {
  public id?: number;
  public content!: string;
  public repository!: string;
  public register_date!: number;
  public member_id!: number;
}

export default function (sequelize: Sequelize) {
  PlanModel.init(
    {
      id: {
        type: DataTypes.MEDIUMINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      repository: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      register_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      member_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      modelName: "plan",
      tableName: "plan",
      sequelize,
      timestamps: false,
    }
  );

  return PlanModel;
}
