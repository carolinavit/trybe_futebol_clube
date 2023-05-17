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
}
