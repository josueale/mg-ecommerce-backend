import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { isValidObjectId } from 'mongoose';

import Carts from '@Models/cart.model';
import { Product } from '@Types/product.type';

interface Cart {
  _id: string
  products: Product[]
}

const createCart = async (items: any[] = []) => {

  const DSS = new Carts({
    is_active: true,
    items: items
  })

  const res = await DSS.save()

  return res

}


export async function getCartController(req: Request, res: Response) {
  try {
    const create = async () => {
      const cartCreated = await createCart([])

      res.status(201).json({
        isSuccess: true,
        code: 201,
        message: 'Cart created',
        // @ts-ignore
        value: { ...cartCreated._doc, products: [] },
      })
    }

    const cart_id = req.get('cart_id')

    if (!cart_id) {
      create()
      return
    }

    if (cart_id && !isValidObjectId(cart_id)) {
      res
        .status(400)
        .json({
          isSuccess: false,
          message: 'Invalid id',
          value: null,
        })
      return
    }

    const cartExist = await Carts.findOne({ is_active: true, _id: new ObjectId(cart_id) })

    if (!cartExist) {
      create()
      return
    }

    const [cartMatch] = await Carts.aggregate<Cart>([
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

    ])

    res.json({
      isSuccess: true,
      code: 200,
      message: 'Cart found',
      value: cartMatch ?? {
        _id: cart_id,
        products: [],
        total: 0,
        shipping: 0,
        subtotal: 0,
      }
    })

  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}