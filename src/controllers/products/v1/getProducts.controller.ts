import Products from '@Models/product.model';
import { Request, Response } from 'express';

export async function getProductsController(_req: Request, res: Response) {
  try {
    const products = await Products.find({})

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