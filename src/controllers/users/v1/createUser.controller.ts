import { Request, Response } from 'express';

import { asyncHashString } from '@Helpers/bycript';
import Users from '@Models/user.model';

export async function createUserController(req: Request, res: Response) {
  try {
    const { name, lastname, email, password } = req.body;

    const userMatch = await Users.findOne({ email: email.trim() });

    if (userMatch) {
      res.status(400).json({
        isSuccess: false,
        message: 'Email already in use, use another',
        value: null,
      });
      return;
    }

    const newUser = new Users({
      name: name?.trim() ?? '',
      lastname: lastname?.trim() ?? '',
      email: email?.trim() ?? '',
      password: password,
      is_active: true,
      profile: 'user',
    });

    const passwordHashed = await asyncHashString(newUser.password);

    newUser.password = passwordHashed!;

    const userSaved = await newUser.save();

    res.status(201).json({
      isSuccess: true,
      message: 'User created successfully',
      value: userSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
