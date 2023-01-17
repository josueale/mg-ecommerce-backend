import Users from '@Models/user.model';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { isValidObjectId } from 'mongoose';

export async function deleteUserController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({
        isSuccess: false,
        message: 'Must provide a valid id',
        value: null,
      });
      return;
    }

    const userMatch = await Users.findOne({ _id: new ObjectId(id) });

    if (!userMatch) {
      res.status(404).json({
        isSuccess: false,
        message: 'User not found',
        value: null,
      });
      return;
    }

    userMatch.is_active = false

    await userMatch.save()

    res.json({
      isSuccess: true,
      message: 'User deleted successfully',
      value: id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
