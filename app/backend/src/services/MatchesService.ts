import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchesModel';
import { IMatch, IMatchService } from '../interfaces/Imatch.interface';

export default class MatchService implements IMatchService {
  getAll = async (): Promise<IMatch[]> => {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
    });
    return matches;
  };
}
