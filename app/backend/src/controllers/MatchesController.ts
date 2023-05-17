import { Request, Response } from 'express';
import { IMatchService } from '../interfaces/Imatch.interface';
import MatchService from '../services/MatchesService';

export default class MatchesController {
  matchService: IMatchService;

  constructor(InstanceOfMatchService = new MatchService()) {
    this.matchService = InstanceOfMatchService;
    this.getAll = this.getAll.bind(this);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    const matches = await this.matchService.getAll(inProgress);
    res.status(200).json(matches);
  }
}
