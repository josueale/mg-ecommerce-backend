import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import Carts from '@Models/cart.model';

export async function deleteItemController(req: Request, res: Response) {
  try {
    const cart_id = req.get('cart_id')
    const { productId } = req.params

    const match = await Carts.findOne({ _id: new ObjectId(cart_id) })

    if (!match) {
      return
    }

    const updated = await Carts.findOneAndUpdate(
      { _id: new ObjectId(cart_id) },
      { $pull: { items: { product_id: new ObjectId(productId) } } },
      { returnOriginal: false }
    )

    console.log({ productId, updated });

    res.json({
      isSuccess: true,
      code: 200,
      message: 'Cart updated',
      value: updated,
    })


  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}