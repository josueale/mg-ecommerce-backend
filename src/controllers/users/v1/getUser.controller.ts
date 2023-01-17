import { Request, Response } from 'express';

export async function getUserController(_req: Request, res: Response) {
  try {

    res.json({
      ok: true
    })


  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}