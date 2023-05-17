export interface IMatch {
  id?: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IMatchService {
  getAll(inProgress: unknown): Promise<IMatch[]>;
  finishMatch(id: number): Promise<IMatch>;
}
