import { NextFunction, Request, Response } from 'express';
import { IUserService } from '../interfaces/Iuser.interface';
import UserService from '../services/UserService';

export default class UserController {
  userService: IUserService;

  constructor(InstanceOfUserService = new UserService()) {
    this.userService = InstanceOfUserService;
    this.signin = this.signin.bind(this);
    this.getRole = this.getRole.bind(this);
  }

  async signin(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;
    try {
      const token = await this.userService.signin(email, password);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  }

  async getRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email } = res.getHeaders();
      const role = await this.userService.getRole(String(email));
      res.status(200).json({ role });
    } catch (error) {
      next(error);
    }
  }
}
