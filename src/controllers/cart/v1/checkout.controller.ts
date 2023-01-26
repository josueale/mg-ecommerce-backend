import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import Carts from '@Models/cart.model';
import Orders from '@Models/order.model';
import Users from '@Models/user.model';

export async function CheckoutController(req: Request, res: Response) {
  try {

    // const user_id = req.get('user_id')
    // const cart_id = req.get('cart_id')

    const { billing_address, cart_id, user_id } = req.body

    const [Cart, User] = await Promise.all([
      Carts.aggregate([
        {
          $match: {
            is_active: true,
            _id: new ObjectId(cart_id),
          }
        },

        { $unwind: { path: '$items' } },

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

        {
          $project: {
            items: 0,
          }
        },

      ]),

      Users.findOne({ _id: new ObjectId(user_id), is_active: true }),

    ])

    if (!User) {
      res.status(404).json({
        isSuccess: true,
        code: 404,
        message: 'User not found',
        value: null,
      })

      return
    }

    const newOrder = new Orders({
      billing_address: billing_address,
      cart_id: new ObjectId(cart_id),
      user_id: new ObjectId(user_id)
    })

    const saved = await newOrder.save()

    await Carts.findOneAndUpdate(
      { _id: new ObjectId(cart_id) },
      { is_active: false }
    )


    res.json({
      isSuccess: true,
      code: 201,
      message: 'Order created',
      value: saved,
    })

  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}