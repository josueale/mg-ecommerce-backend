import { Types } from 'mongoose';

export interface Cart {
  is_active: boolean

  user_id: Types.ObjectId
  products_id: Types.ObjectId[]
}