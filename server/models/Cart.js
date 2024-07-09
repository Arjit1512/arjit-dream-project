import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'dream-user',
    },
    productId: {
      required: true,
      type: Number,
    },
    quantity: {
      required: true,
      type: Number,
    },
    price: {
      required: false,
      type: Number,
    },
    name:{
      required: false,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;