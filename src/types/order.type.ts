import { Types } from "mongoose"

export default interface Order {
  user_id: Types.ObjectId
  products_id:  Types.ObjectId

}