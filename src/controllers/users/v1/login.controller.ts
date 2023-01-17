import { compare } from 'bcryptjs';

import { generate } from '@Helpers/jwt';
import Users from '@Models/user.model';
import { Request, Response } from 'express';

export async function loginUserController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const errorAuth = {
      status: 'error',
      type: 'user-credentials',
      message: 'Incorrect credentials, please verify your credentials.',
      value: null,
    };

    const match = await Users.findOne({ email: email?.trim() ?? '' });

    if (!match) {
      res.status(400).json(errorAuth);
      return;
    }

    const isMatch = await compare(password, match.password);

    if (!isMatch) {
      res.status(400).json(errorAuth);
      return;
    }

    const token = await generate(
      { user_id: match._id.toString() },
      { expiresIn: '2h' }
    );

    const defaultResponse = {
      authenticated: true,
      user: match,
      token,
    };

    res.json({
      status: 'success',
      type: 'user-login',
      message: 'Logged successfully',
      value: defaultResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
