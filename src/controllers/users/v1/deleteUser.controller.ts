import Users from '@Models/user.model';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { isValidObjectId } from 'mongoose';

export async function deleteUserController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      res.status(400).json({
        status: 'error',
        type: 'bad-request',
        message: 'Must provide a valid id',
        value: null,
      });
      return;
    }

    const userD = await Users.deleteOne({ _id: new ObjectId(id) });

    if (!userD.deletedCount) {
      res.status(400).json({
        status: 'error',
        type: 'deleting-user',
        message: 'Error while deleting User',
        value: null,
      });
      return;
    }

    res.json({
      status: 'success',
      type: 'user-deleted',
      message: 'User deleted successfully',
      value: id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
