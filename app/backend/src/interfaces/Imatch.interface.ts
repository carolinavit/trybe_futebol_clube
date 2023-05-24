export interface IMatch {
  id?: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchLead extends IMatch {
  homeTeam: { teamName: string }
}

export interface ILeaderboardTeam {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export interface IMatchService {
  getAll(inProgress: unknown): Promise<IMatch[]>;
  finishMatch(id: number): Promise<IMatch>;
  update(
    id: number,
    awayTeamGoals: number,
    homeTeamGoals: number,
  ): Promise<IMatch | undefined>;
  create(newMatch: IMatch): Promise<IMatch | undefined>;
  getHomeLeaderboard(): Promise<ILeaderboardTeam[]>;
}
