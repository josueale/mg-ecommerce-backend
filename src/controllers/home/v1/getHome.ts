import { Request, Response } from 'express';

import Products from '@Models/product.model';

export async function getHomeController(_req: Request, res: Response) {
  try {
    const products = await Products.aggregate([
      { $match: { is_active: true } },
      {
        $project: {
          comments_id: 0,
          is_active: 0,
          stock: 0,
          in_stock: 0,
          tags: 0,
        }
      }
    ])

    res.json({
      isSuccess: true,
      code: 200,
      message: 'Home loaded',
      value: {
        banners: products,
        newest: products,
        bestSellers: products,
        mostPopular: products,
      },
    })

  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}