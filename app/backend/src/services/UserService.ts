import { compareSync } from 'bcryptjs';
import { IUserService } from '../interfaces/Iuser.interface';
import UserModel from '../database/models/UserModel';
import { generateToken } from '../utils/auth';

export default class UserService implements IUserService {
  signin = async (email: string, password: string): Promise<string> => {
    const user = await UserModel.findOne({
      where: { email },
      attributes: ['email', 'password'],
    });

    if (!user || !compareSync(password, user.password)) {
      throw new Error('Invalid email or password');
    }

    return generateToken(email);
  };
}
