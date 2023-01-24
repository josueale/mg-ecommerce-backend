import { Request, Response } from 'express';

import Products from '@Models/product.model';

export async function getProductsController(_req: Request, res: Response) {
  try {
    const products = await Products.find({ is_active: true })

    res.json({
      isSuccess: true,
      message: 'Products list',
      value: products,
    })
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}