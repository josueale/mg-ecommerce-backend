import { Types } from 'mongoose';

export interface Comment {
  is_active: boolean

  product_id: Types.ObjectId
  user_id: Types.ObjectId

  value: string
  valoration: number
}