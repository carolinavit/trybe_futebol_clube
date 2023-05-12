import { Request, Response } from 'express';
import ITeamService from '../interfaces/index';
import TeamService from '../services/TeamService';

export default class TeamsController {
  teamService: ITeamService;

  constructor(InstanceOfTeamService = new TeamService()) {
    this.teamService = InstanceOfTeamService;
    this.getAll = this.getAll.bind(this);
  }

  async getAll(_req: Request, res: Response): Promise<void> {
    const teams = await this.teamService.getAll();
    res.status(200).json(teams);
  }
}
