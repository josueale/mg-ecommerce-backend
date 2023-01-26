import { Schema, model } from 'mongoose';

import Order from '@Types/order.type';

const OrderSchema = new Schema<Order>(
  {
    cart_id: Schema.Types.ObjectId,
    user_id: Schema.Types.ObjectId,

    billing_address: {
      type: String,
      default: ''
    }

  },
  { versionKey: false, timestamps: true }
);

const Orders = model('order', OrderSchema);

export default Orders;
