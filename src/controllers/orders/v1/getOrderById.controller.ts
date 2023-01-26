import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import Orders from '@Models/order.model';

export async function GetOrderByIdController(req: Request, res: Response) {
  try {
    const { id } = req.params


    const [match] = await Orders.aggregate([
      { $match: { _id: new ObjectId(id) } },

      {
        $lookup: {
          from: 'users',
          let: { userMatch: '$user_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$userMatch'] } } },
            {
              $project: {
                password: 0,
              }
            }
          ],
          as: 'user'
        }
      },

      { $unwind: { path: '$user', preserveNullAndEmptyArrays: true } },


      {
        $lookup: {
          from: 'carts',
          let: { match: '$cart_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$_id', '$$match'] } } },

            { $unwind: { path: '$items', preserveNullAndEmptyArrays: true } },

            {
              $lookup: {
                from: 'products',
                let: { match: '$items', quantityMatch: '$items.quantity' },
                pipeline: [
                  { $match: { $expr: { $eq: ['$_id', '$$match.product_id'] } } },

                  {
                    $addFields: {
                      quantity: '$$quantityMatch'
                    }
                  }
                ],
                as: 'product'
              }
            },

            { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } },


            {
              $group: {
                _id: '$_id',
                products: { $push: '$product' },
                subtotal: { "$sum": { "$multiply": ["$product.price", "$product.quantity"] } },
                shipping: { "$sum": { "$multiply": ["$product.quantity", 5] } },
              },
            },

            {
              $addFields: {
                total: { $sum: ['$subtotal', '$shipping'] }
              }
            },

            { $project: { items: 0, } },

          ],
          as: 'cart'
        }
      },


      { $unwind: { path: '$cart', preserveNullAndEmptyArrays: true } },


    ])


    if (!match) {
      res.status(404).json({
        isSuccess: false,
        code: 404,
        message: 'Order does not exists',
        value: null,
      })
      return
    }


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