import { Request, Response } from 'express';

import { decode, generate } from '@Helpers/jwt';
import Users from '@Models/user.model';
import { ObjectId } from 'mongodb';

export async function loginByTokenController(req: Request, res: Response) {
  try {
    const { token } = req.body;

    const errorAuth = {
      status: 'error',
      type: 'user-credentials',
      message: 'Incorrect credentials, please verify your credentials.',
      value: null,
    };

    // improve this
    const payload = await decode<{ user_id: string }>(token);

    if (!payload) {
      res.status(400).json(errorAuth);

      return;
    }

    const { user_id } = payload;

    const match = await Users.findOne(
      { _id: new ObjectId(user_id) },
      { password: 0 }
    );

    if (!match) {
      res.status(400).json(errorAuth);

      return;
    }

    const newToken = await generate(
      { user_id: match._id.toString() },
      { expiresIn: '2h' }
    );

    const defaultResponse = {
      authenticated: true,
      user: match,
      token: newToken, // expiresIn updated too
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
