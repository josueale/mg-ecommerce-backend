import Users from '@Models/user.model';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

export async function updateUserController(req: Request, res: Response) {
  try {
    const { name, lastname, email, user_id } = req.body;

    const userMatch = await Users.findOne({ _id: new ObjectId(user_id) });

    if (!userMatch) {
      res.status(400).json({
        status: 'error',
        type: 'user-not-found',
        message: 'User not found',
        value: null,
      });
      return;
    }

    userMatch.name = name?.trim() ?? '';
    userMatch.lastname = lastname?.trim() ?? '';
    userMatch.email = email?.trim() ?? '';

    const userSaved = await userMatch.save();

    if (!userMatch) {
      // handle this
      res.status(400).json({
        status: 'error',
        type: 'user-update-error',
        message: 'Error while updating user information',
        value: null,
      });
      return;
    }

    res.json({
      status: 'success',
      type: 'user-updated',
      message: 'User information updated successfully',
      value: userSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
