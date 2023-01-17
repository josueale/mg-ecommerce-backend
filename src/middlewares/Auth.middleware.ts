import { NextFunction, Request, Response } from 'express';
import { decode, isExpiredToken } from '../helpers/jwt';


async function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
  try {

    const ORIGIN = req.get('Custom-Origin');

    let AUTH = req.get('Authorization');

    if (!AUTH || !ORIGIN) {
      return res.status(401).json({
        status: 'Unauthorized',
        message: 'Missing parameters',
      });
    }

    AUTH = AUTH.replace('Bearer ', '');

    const decoded = await decode<{ user_id: string; }>(AUTH);

    if (!decoded) {
      throw new Error('not valid');
    }

    const { user_id } = decoded;

    const isExpired = isExpiredToken(decoded);

    if (isExpired) {
      return res
        .status(401)
        .json({
          status: 'Unauthorized',
          message: 'Session expired',
        });
    }

    req.headers.user_id = user_id;

    return next();
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({
        status: 'Unauthorized',
        message: 'Error decoding',
      });
  }
}

export default AuthMiddleware;