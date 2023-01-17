import { Schema, model } from 'mongoose';

import { Cart, CartItem } from '@Types/cart.type';

export const ItemSchema = new Schema<CartItem>({
  quantity: Number,
  product_id: Schema.Types.ObjectId,
});

const CartSchema = new Schema<Cart>(
  {
    is_active: Boolean,
    items: [ItemSchema],
  },
  { versionKey: false, timestamps: true }
);

const Carts = model('cart', CartSchema);

export default Carts;
