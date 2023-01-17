import { Types } from 'mongoose';

export interface Product {
  _id: Types.ObjectId
  is_active: boolean

  title: string
  description: string
  price: number

  stock: number
  in_stock: boolean

  is_on_sale: boolean
  on_sale_price: number

  tags: string[]
  category: string

  comments_id: Types.ObjectId[]
}