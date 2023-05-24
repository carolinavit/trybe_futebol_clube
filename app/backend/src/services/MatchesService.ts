import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchesModel';
import {
  ILeaderboardTeam,
  IMatch,
  IMatchLead,
  IMatchService,
} from '../interfaces/Imatch.interface';
import TeamService from './TeamService';

const getTotalPoints = (matches: IMatchLead[], id: number) => {
  let totalPoints = 0;
  matches
    .filter((match) => match.homeTeamId === id)
    .forEach((teamMatch) => {
      if (teamMatch.homeTeamGoals > teamMatch.awayTeamGoals) {
        totalPoints += 3;
      }

      if (teamMatch.homeTeamGoals === teamMatch.awayTeamGoals) {
        totalPoints += 1;
      }
    });
  return totalPoints;
};

const getTotalLosses = (matches: IMatchLead[], id: number) => {
  let totalLosses = 0;
  matches
    .filter((match) => match.homeTeamId === id)
    .forEach((teamMatch) => {
      if (teamMatch.homeTeamGoals < teamMatch.awayTeamGoals) {
        totalLosses += 1;
      }
    });
  return totalLosses;
};

const getGolsFavor = (matches: IMatchLead[], id: number) => {
  let goalsFavor = 0;
  matches
    .filter((match) => match.homeTeamId === id)
    .forEach((teamMatch) => {
      goalsFavor += teamMatch.homeTeamGoals;
    });
  return goalsFavor;
};

const getGolsOwn = (matches: IMatchLead[], id: number) => {
  let goalsOwn = 0;
  matches
    .filter((match) => match.homeTeamId === id)
    .forEach((teamMatch) => {
      goalsOwn += teamMatch.awayTeamGoals;
    });
  return goalsOwn;
};

const getGoalsBalance = (matches: IMatchLead[], id: number) =>
  getGolsFavor(matches, id) - getGolsOwn(matches, id);

const getEfficiency = (matches: IMatchLead[], id: number) => {
  const points = getTotalPoints(matches, id);
  const games = matches.filter((m) => m.homeTeamId === id).length;
  return Number(((points / (games * 3)) * 100).toFixed(2));
};

const sortLeaderBoard = (matches: ILeaderboardTeam[]) =>
  matches.sort((a, b) => {
    if (a.totalPoints < b.totalPoints) return 1;
    if (a.totalPoints > b.totalPoints) return -1;
    if (a.goalsBalance < b.goalsBalance) return 1;
    if (a.goalsBalance > b.goalsBalance) return -1;
    if (a.goalsFavor < b.goalsFavor) return 1;
    if (a.goalsFavor > b.goalsFavor) return -1;
    return 0;
  });

const getLeaderboard = (matches: IMatchLead[]) => {
  const leaderboard: ILeaderboardTeam[] = [];
  matches.forEach((match) => {
    if (!leaderboard.some((match2) => match2.name === match.homeTeam.teamName)) {
      leaderboard.push({
        name: match.homeTeam.teamName,
        totalPoints: getTotalPoints(matches, match.homeTeamId),
        totalGames: matches.filter((m) => m.homeTeamId === match.homeTeamId).length,
        totalVictories: Math.floor(getTotalPoints(matches, match.homeTeamId) / 3),
        totalDraws: Math.floor(getTotalPoints(matches, match.homeTeamId) % 3),
        totalLosses: getTotalLosses(matches, match.homeTeamId),
        goalsFavor: getGolsFavor(matches, match.homeTeamId),
        goalsOwn: getGolsOwn(matches, match.homeTeamId),
        goalsBalance: getGoalsBalance(matches, match.homeTeamId),
        efficiency: getEfficiency(matches, match.homeTeamId),
      });
    }
  });
  return leaderboard;
};

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

    const createNewMatch = await Match.create({
      ...newMatch,
      inProgress: true,
    });
    return createNewMatch;
  };

  getHomeLeaderboard = async (): Promise<ILeaderboardTeam[]> => {
    const matches = (await Match.findAll({
      where: { inProgress: false },
      include: [{ model: Team, as: 'homeTeam', attributes: ['teamName'] }],
    })) as unknown as IMatchLead[];

    const result = getLeaderboard(matches);
    return sortLeaderBoard(result);
  };
}
