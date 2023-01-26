import Users from '@Models/user.model';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

export async function getUserByIdForAdminController(req: Request, res: Response) {
  try {

    const { id } = req.params

    const [match] = await Users.aggregate([
      { $match: { _id: new ObjectId(id) } },
      { $project: { password: 0 } },
      {
        $lookup: {
          from: 'orders',
          let: { user: '$_id' },
          pipeline: [
            { $match: { $expr: { $eq: ['$user_id', "$$user"] } } },

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



          ],
          as: 'orders'
        }
      }
    ])

    if (!match) {
      res.status(404).json({
        isSuccess: false,
        code: 404,
        message: 'User not found',
        value: null,
      })
      return
    }

    res.json({
      isSuccess: true,
      code: 200,
      message: 'User found',
      value: match,
    })

  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}