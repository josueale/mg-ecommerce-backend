import Users from '@Models/user.model';
import { Request, Response } from 'express';

export async function getAllUsersController(_req: Request, res: Response) {
  try {
    const allUsers = await Users.find({});

    res.json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
