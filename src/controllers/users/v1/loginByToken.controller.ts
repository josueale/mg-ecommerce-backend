import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import { decode, generate } from '@Helpers/jwt';
import Users from '@Models/user.model';

export async function loginByTokenController(req: Request, res: Response) {
  try {
    const { token } = req.body;

    const errorAuth = {
      isSuccess: false,
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
      // return 400 because we won't let the attacker know what part of the request it's bad
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
      isSuccess: true,
      message: 'Logged successfully',
      value: defaultResponse,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
