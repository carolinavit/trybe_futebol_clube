import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: STRING(30),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'teams',
    timestamps: false,
    underscored: true,
  },
);

export default Team;
