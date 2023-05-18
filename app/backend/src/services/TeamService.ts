import Team from '../database/models/TeamModel';
import { ITeamService, ITeam } from '../interfaces/Iteam.interface';

export default class TeamService implements ITeamService {
  getAll = async (): Promise<ITeam[]> => {
    const teams = await Team.findAll();
    return teams;
  };

  getById = async (id: number): Promise<ITeam | null> => {
    const team = await Team.findOne({
      where: { id },
      attributes: ['id', 'teamName'],
    });

    if (!team) {
      throw new Error('There is no team with such id!');
    }
    return team;
  };
}
