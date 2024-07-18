// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true,unique:true },
  password: { type: String, required: true },
  feedback: [
    {
      message: String,
      fName: String,
      lName: String,
      subject: String,
    },
  ],
  tokens: [{ token: { type: String, required: true } }],
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }],
  totalOrders: [
    {
      items: [
        {
          productId: { type: Number, required: true },
          quantity: { type: Number, required: true },
          price: { type: Number, required: true },
          name: { type: String, required: true },
          size: { type: String },
        },
      ],
      totalBill: { type: Number, required: true },
      orderDate: { type: Date, default: Date.now },
    },
  ],
});

const User = mongoose.model('dream-user', userSchema);

export default User;
