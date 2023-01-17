import Products from '@Models/product.model';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

export async function deleteProductController(req: Request, res: Response) {
  try {

    const { id } = req.params

    const productMatch = await Products.findOne({ _id: new ObjectId(id) })

    if (!productMatch) {
      res.status(404).json({
        isSuccess: false,
        message: 'Product not found',
        value: null,
      })
      return
    }

    productMatch.is_active = false;

    const productUpdated = await productMatch.save()

    res.json({
      isSuccess: true,
      message: 'Product updated',
      value: productUpdated,
    })
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}