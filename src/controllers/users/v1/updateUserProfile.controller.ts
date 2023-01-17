import { Request, Response } from "express";
import { ObjectId } from "mongodb";

import Users from "@Models/user.model";

export async function updateUserProfileController(req: Request, res: Response) {
  try {

    const user_id = req.get('user_id')!

    const userMatch = await Users.findOne({ _id: new ObjectId(user_id) })

    if (!userMatch) {
      res
        .status(404)
        .json({
          isSuccess: false,
          message: 'User not found',
          value: null
        })
      return
    }

    const { name, lastname } = req.body

    userMatch.name = name?.trim() ?? '';
    userMatch.lastname = lastname?.trim() ?? '';
    // user image profile?

    const userUpdated = await userMatch.save()

    res.json({
      isSuccess: true,
      message: 'User profile updated',
      value: userUpdated
    })

  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}