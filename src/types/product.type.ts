import { Types } from 'mongoose';

export interface Product {
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