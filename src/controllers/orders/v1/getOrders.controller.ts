import { Request, Response } from 'express';

import Orders from '@Models/order.model';

// import { ObjectId } from 'mongodb';


export async function GetOrdersController(_req: Request, res: Response) {
  try {

    const all = await Orders.aggregate([
      { $match: { is_active: true } }
    ])

    res.json({
      isSuccess: true,
      code: 200,
      message: 'Found',
      value: all,
    })



  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}