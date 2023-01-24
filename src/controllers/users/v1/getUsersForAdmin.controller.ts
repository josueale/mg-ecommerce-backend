import Users from '@Models/user.model';
import { Request, Response } from 'express';

export async function getUsersForAdminController(_req: Request, res: Response) {
  try {

    const resp = await Users.aggregate([
      { $match: { is_active: true } },
      {
        $project: {
          password: 0
        }
      }
    ])

    res.json({
      isSuccess: true,
      code: 200,
      message: 'User found',
      value: resp,
    })

  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}