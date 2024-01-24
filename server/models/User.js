import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 2,
      unique: false
    },    
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('dream-user', UserSchema);
export default User;
