import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import Carts from '@Models/cart.model';


export async function updateCartController(req: Request, res: Response) {
  try {
    const { product_id, quantity, cart_id } = req.body
    console.log({ product_id, quantity, cart_id });

    const cartMatch = await Carts.findOne({ _id: new ObjectId(cart_id), is_active: true })

    if (!cartMatch) {
      return
    }

    const productIndex = cartMatch.items.findIndex((item) => item.product_id.toString() === product_id)


    if (productIndex === -1) {
      const updated = await Carts.findOneAndUpdate(
        { _id: new ObjectId(cart_id), is_active: true },
        {
          $push: {
            items: {
              product_id: new ObjectId(product_id),
              quantity
            }
          }
        })

      res.json({
        isSuccess: true,
        code: 200,
        message: 'Cart successfully updated',
        value: updated,
      })
      return
    }

    const updated = await Carts.findOneAndUpdate(
      {
        _id: new ObjectId(cart_id),
        'items.product_id': new ObjectId(product_id),
        is_active: true
      },
      {
        $inc: {
          'items.$.quantity': quantity
        }
      }
    )

    res.json({
      isSuccess: true,
      code: 200,
      message: 'Cart successfully updated',
      value: updated,
    })

  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}