import Team from '../database/models/TeamModel';
import { ITeamService, ITeam } from '../interfaces/Iteam.interface';

export default class TeamService implements ITeamService {
  getAll = async (): Promise<ITeam[]> => {
    const teams = await Team.findAll();
    return teams;
  };
}
