import { Request, Response } from 'express';
import UserStore, { User } from '../models/user';
import generateToken from '../utilities/generateToken';

const User = new UserStore();

export default class UsersController {
  async getUsers(_req: Request, res: Response): Promise<void> {
    try {
      const users = await User.index();
      if (!users.length || users.length === 0) {
        res.status(404).json({
          success: false,
          message: 'Users are not found',
        });
        return;
      }
      res.json({
        success: true,
        data: users,
      });
    } catch {
      res.status(500).json({
        success: false,
        message: 'Error! Something is wrong.',
      });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await User.show(id as string);
      if (!user) {
        res.status(404).json({
          success: false,
          message: 'User is not found.',
        });
        return;
      }
      res.json({
        success: true,
        data: user,
      });
    } catch {
      res.status(500).json({
        success: false,
        message: 'Error! Something is wrong.',
      });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password }: User = req.body;
      const user = await User.create({
        name,
        email,
        password,
      });
      if (!user || user === null) {
        res.status(400).json({
          success: false,
          message: 'User is already exist.',
        });
        return;
      }
      res.status(201).json({
        success: true,
        data: user,
      });
    } catch {
      res.status(500).json({
        success: false,
        message: 'Error! Something is wrong.',
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      //@ts-ignore
      const user_id = req.user.id;

      if (id !== user_id) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized.',
        });
        return;
      }
      const user = await User.delete(id as string);
      if (!user || user === undefined) {
        res.status(404).json({
          success: false,
          message: "User can't be deleted. because It isn't found.",
        });
        return;
      }

      res.json({
        success: true,
        data: user,
        message: 'User deleted successfuly.',
      });
    } catch {
      res.status(500).json({
        success: false,
        message: 'Error! Something is wrong.',
      });
    }
  }

  async authUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password }: User = req.body;
      const user = await User.authenticate(email, password);
      if (user === null) {
        res.status(401).json({
          success: false,
          message: 'Email or password is wrong.',
        });
        return;
      }
      const token = generateToken(user.id as string, user.name as string, user.email as string);
      res.header('x-auth-token', token).json({
        success: true,
        message: 'Login successfuly.',
        token: token,
      });
    } catch {
      res.status(500).json({
        success: false,
        message: 'Error! Something is wrong.',
      });
    }
  }
}
