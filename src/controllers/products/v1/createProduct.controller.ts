import Products from '@Models/product.model';
import { Request, Response } from 'express';

export async function createProductController(req: Request, res: Response) {
  try {

    const {
      title, description, price,
      stock, in_stock,
      is_on_sale, on_sale_price,
      tags, category,
    } = req.body

    const productMatch = await Products.findOne({ title: title?.trim() ?? '' })

    if (productMatch) {
      res.status(400).json({
        isSuccess: false,
        message: 'Product already exists',
        value: productMatch,
      })
      return
    }

    const product = new Products({
      description: description?.trim() ?? '',
      price: price ?? 0,

      stock: stock ?? 0,
      in_stock: in_stock ?? false,

      is_on_sale: is_on_sale ?? false,
      on_sale_price: on_sale_price ?? 0,

      tags: tags?.filter((value: string) => value) ?? [],
      category: category?.trim() ?? '',
    })

    const productSaved = await product.save()

    res.json({
      isSuccess: true,
      message: 'Product created',
      value: productSaved,
    })

  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}