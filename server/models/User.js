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
    message:{
      type:String,
      max:100,
      required:false,
      unique:false,
    },
    fName:{
      type:String,
      max:100,
      required:false,
      unique:false,
    },
    lName:{
      type:String,
      max:100,
      required:false,
      unique:false,
    },
    subject:{
      type:String,
      max:100,
      required:false,
      unique:false,
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
