import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import Carts from '@Models/cart.model';
import Users from '@Models/user.model';

export async function CheckoutController(req: Request, res: Response) {
  try {

    const user_id = req.get('user_id')
    const cart_id = req.get('cart_id')

    const [Products, User] = await Promise.all([
      Carts.aggregate([
        { $match: { is_active: true, _id: new ObjectId(cart_id) } },
        {
          $lookup: {
            from: 'products',
            let: { match: '$items', },
            pipeline: [
              { $match: { $in: ["$_id", "$$match.product_id"] } }
            ],
            as: 'products'
          }
        }
      ]),

      Users.findOne({ _id: new ObjectId(user_id), is_active: true }),

    ])

    console.log("Products", Products);
    console.log("User", User);

    if (!User) {
      res.status(404).json({
        isSuccess: true,
        code: 404,
        message: 'User not found',
        value: null,
      })

      return
    }





  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}