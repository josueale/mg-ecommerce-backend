import { Request, Response } from 'express';
import { PipelineStage } from 'mongoose';


import { slugify } from '@Helpers/search';
import Products from '@Models/product.model';

interface Query {
  is_active: true
  name?: string | RegExp
  title?: any | string | RegExp
  min?: number
  max?: number
  category?: string
  order?: 'lowest' | 'highest' | 'newest' | 'popularity'
}

export async function searchProductController(req: Request, res: Response) {
  try {

    // name: '',
    // min: 0,
    // max: 0,
    // category: '',
    // order: ['price+-', 'dateCreated', 'comments/popularity' ]

    const {
      title,
      // name,
      //  min, max, category, order
    } = req.query

    const query: Query = {
      is_active: true
    }

    let queryOrder: PipelineStage = {
      $sort: {
        createdAt: 1,
      }
    }

    if (title) {
      // query.title = new RegExp(name as string)
      query.title = { $regex: slugify(title as string) ?? '', $options: 'i' }

    }

    // if (min) {
    //   query.min = Number(min)
    // }

    // if (max) {
    //   query.max = Number(max)
    // }

    // if (category) {
    //   query.category = category as string
    // }

    // if (order) {
    //   queryOrder.$sort = {
    //     createdAt: -1
    //   }
    // }

    const productsMatch = await Products.aggregate([
      { $match: query },
      queryOrder
    ])

    console.log({ $match: query });
    res.json({
      isSuccess: true,
      code: 200,
      message: 'Search result',
      value: productsMatch,
    })


  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}