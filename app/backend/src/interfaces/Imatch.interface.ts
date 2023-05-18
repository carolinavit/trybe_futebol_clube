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
  update(
    id: number,
    awayTeamGoals: number,
    homeTeamGoals: number,
  ): Promise<IMatch | undefined>;
  create(newMatch: IMatch): Promise<IMatch | undefined>;
}
