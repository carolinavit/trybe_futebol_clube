import { NextFunction, Request, Response } from 'express';
import { IMatchService } from '../interfaces/Imatch.interface';
import MatchService from '../services/MatchesService';

export default class MatchesController {
  matchService: IMatchService;

  constructor(InstanceOfMatchService = new MatchService()) {
    this.matchService = InstanceOfMatchService;
    this.getAll = this.getAll.bind(this);
    this.finishMatch = this.finishMatch.bind(this);
    this.update = this.update.bind(this);
    this.create = this.create.bind(this);
    this.getHomeLeaderboard = this.getHomeLeaderboard.bind(this);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    const matches = await this.matchService.getAll(inProgress);
    res.status(200).json(matches);
  }

  async finishMatch(req: Request, res: Response) {
    const id = Number(req.params.id);
    await this.matchService.finishMatch(id);
    res.status(200).json({ message: 'Finished' });
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const { awayTeamGoals, homeTeamGoals } = req.body;
    const updated = await this.matchService.update(
      id,
      awayTeamGoals,
      homeTeamGoals,
    );
    res.status(200).json({ message: updated });
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const newMatch = req.body;
      const createdNewMatch = await this.matchService.create(newMatch);
      res.status(201).json(createdNewMatch);
    } catch (error) {
      next(error);
    }
  }

  async getHomeLeaderboard(req: Request, res: Response) {
    const homeLeaderboard = await this.matchService.getHomeLeaderboard();
    res.status(200).json(homeLeaderboard);
  }
}
