import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

import Team from './TeamModel';

class Match extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    homeTeamId: {
      type: INTEGER,
      allowNull: false,
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeamId: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'matches',
    timestamps: false,
    underscored: true,
  },
);

Team.hasMany(Match, { foreignKey: 'homeTeamId' });
Match.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });

Team.hasMany(Match, { foreignKey: 'awayTeamId' });
Match.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Match;
