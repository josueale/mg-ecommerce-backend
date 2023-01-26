import { Types } from "mongoose"

export default interface Order {
  user_id: Types.ObjectId
  cart_id: Types.ObjectId
  billing_address: string

}