import { TMember } from "types/auth";
import { Model, DataTypes, Sequelize } from "sequelize";

class MemberModel extends Model<TMember> {
  public id!: number;
  public login!: string;
  public email!: string;
  public name!: string;
  public repository!: string;
}

export default function (sequelize: Sequelize) {
  MemberModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      login: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      repository: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      modelName: "member",
      tableName: "member",
      sequelize,
      timestamps: false,
    }
  );

  return MemberModel;
}
