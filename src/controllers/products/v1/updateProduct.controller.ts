import Products from '@Models/product.model';
import { Request, Response } from 'express';

export async function updateProductController(req: Request, res: Response) {
  try {

    const {
      title, description, price,
      stock, in_stock,
      is_on_sale, on_sale_price,
      tags, category,
    } = req.body

    const productMatch = await Products.findOne({ title: title?.trim() ?? '' })

    if (!productMatch) {
      res.status(404).json({
        isSuccess: false,
        message: 'Product does not found',
        value: null,
      })
      return
    }


    productMatch.description = description?.trim() ?? ''
    productMatch.price = price ?? 0

    productMatch.stock = stock ?? 0
    productMatch.in_stock = in_stock ?? false

    productMatch.is_on_sale = is_on_sale ?? false
    productMatch.on_sale_price = on_sale_price ?? 0

    productMatch.tags = tags?.filter((value: string) => value) ?? []
    productMatch.category = category?.trim() ?? ''


    const productUpdated = await productMatch.save()

    res.json({
      isSuccess: true,
      message: 'Product created',
      value: productUpdated,
    })

  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}