import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import Orders from '@Models/order.model';

export async function GetOrderByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params

    const [match] = await Orders.aggregate([
      { $match: { _id: new ObjectId(id) } }
    ])

    res.json({
      isSuccess: true,
      code: 200,
      message: 'Order found',
      value: match,
    })

  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}