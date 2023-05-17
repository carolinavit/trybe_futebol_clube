import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchesModel';
import { IMatch, IMatchService } from '../interfaces/Imatch.interface';

export default class MatchService implements IMatchService {
  getAll = async (inProgress: unknown): Promise<IMatch[]> => {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    if (inProgress === 'true') {
      return matches.filter((match) => match.inProgress === true);
    }
    if (inProgress === 'false') {
      return matches.filter((match) => match.inProgress === false);
    }
    return matches;
  };

  finishMatch = async (id: number): Promise<IMatch> => {
    const match = await Match.findOne({
      where: { id },
    });
    if (!match) {
      throw new Error('Id não encontrado');
    }
    await match?.update({ inProgress: false });
    return match;
  };

  update = async (
    id: number,
    awayTeamGoals: number,
    homeTeamGoals: number,
  ): Promise<IMatch | undefined> => {
    const match = await Match.findOne({
      where: { id },
    });
    const updated = await match?.update({ awayTeamGoals, homeTeamGoals });
    return updated;
  };
}
