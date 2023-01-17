import { Product } from '@Types/product.type';
import { Schema, model } from 'mongoose';

const ProductSchema = new Schema<Product>({
  is_active: {
    type: Boolean,
    default: true
  },

  title: String,
  description: String,
  price: Number,

  stock: {
    type: Number,
    default: 0
  },

  in_stock: {
    type: Boolean,
    default: false
  },

  is_on_sale: {
    type: Boolean,
    default: false
  },

  on_sale_price: {
    type: Number,
    default: 0
  },

  category: String,

  tags: {
    type: [String],
    default: []
  },

  comments_id: {
    type: [Schema.Types.ObjectId],
    default: []
  },

}, { versionKey: false, timestamps: true });

const Products = model('product', ProductSchema);

export default Products;
