import { Types } from 'mongoose';

export interface CartItem {
  product_id: Types.ObjectId
  quantity: number
}

export interface Cart {
  is_active: boolean
  items: CartItem[]
  // user_id: Types.ObjectId
}