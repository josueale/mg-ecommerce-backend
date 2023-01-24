import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';

import Products from '@Models/product.model';

export async function getProductByIdController(req: Request, res: Response) {
  try {

    const { id } = req.params

    // id validation

    const match = await Products.findOne({ _id: new ObjectId(id)})


    if(!match){
      res.status(404).json({
        isSuccess: false,
        code: 404,
        message: 'Product not found',
        value: null,
      })
      return
    }

    res.json({
      isSuccess: true,
      code: 200,
      message: 'Product found',
      value: match,
    })

  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}