import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchesModel';
import { IMatch, IMatchService } from '../interfaces/Imatch.interface';
import TeamService from './TeamService';

export default class MatchService implements IMatchService {
  private teamService: TeamService;
  constructor() {
    this.teamService = new TeamService();
  }

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

  create = async (newMatch: IMatch): Promise<IMatch> => {
    if (newMatch.awayTeamId === newMatch.homeTeamId) {
      throw new Error(
        'It is not possible to create a match with two equal teams',
      );
    }
    await this.teamService.getById(newMatch.homeTeamId);
    await this.teamService.getById(newMatch.awayTeamId);

    const createNewMatch = await Match.create({ ...newMatch, inProgress: true });
    return createNewMatch;
  };
}
