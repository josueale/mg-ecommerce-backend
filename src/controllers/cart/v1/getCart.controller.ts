import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { isValidObjectId } from 'mongoose';

import Carts from '@Models/cart.model';
import { Product } from '@Types/product.type';

interface Cart {
  _id: string
  products: Product[]
}

export async function getCartController(req: Request, res: Response) {
  try {

    const { cart_id } = req.body


    if (!isValidObjectId(cart_id)) {
      res
        .status(400)
        .json({
          isSuccess: false,
          message: 'Invalid id',
          value: null,
        })
      return
    }

    const [cartMatch] = await Carts.aggregate<Cart>([
      {
        $match: {
          is_active: true,
          _id: new ObjectId(cart_id),
        }
      },

      {
        $lookup: {
          from: 'products',
          let: { match: '$products_id' },
          pipeline: [
            { $match: { $in: ['$_id', '$$match'] } }
          ],
          as: 'products'
        }
      },

      {
        $project: {
          products_id: 0,
        }
      },

    ])

    if (!cartMatch) {
      // TODO create cart

      return
    }

    res.json({
      isSuccess: true,
      code: 200,
      message: 'Cart found',
      value: cartMatch
    })

  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}