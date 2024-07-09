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
    feedback: [
      {
        message: {
          type: String,
          max: 100,
          required: false,
          unique: false,
        },
        fName: {
          type: String,
          max: 100,
          required: false,
          unique: false,
        },
        lName: {
          type: String,
          max: 100,
          required: false,
          unique: false,
        },
        subject: {
          type: String,
          max: 100,
          required: false,
          unique: false,
        },
      }
    ],
    tokens: [{ token: String }],
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


// import mongoose from "mongoose";
// import AutoIncrementFactory from 'mongoose-sequence';

// const connection = mongoose.createConnection("mongodb+srv://avadhanamarjit15:mongoarjit15@cluster0.lvudfup.mongodb.net/?retryWrites=true&w=majority"); // Update with your database connection string

// const AutoIncrement = AutoIncrementFactory(connection);

// const UserSchema = new mongoose.Schema(
//   {
//     userName: {
//       type: String,
//       required: true,
//       max: 50,
//       unique: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       max: 50,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//       min: 2,
//       unique: false
//     },
//     message: {
//       type: String,
//       max: 100,
//       required: false,
//       unique: false,
//     },
//     fName: {
//       type: String,
//       max: 100,
//       required: false,
//       unique: false,
//     },
//     lName: {
//       type: String,
//       max: 100,
//       required: false,
//       unique: false,
//     },
//     subject: {
//       type: String,
//       max: 100,
//       required: false,
//       unique: false,
//     },
//     cart: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Cart',
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );

// // Apply the auto-increment plugin to the userSchema
// UserSchema.plugin(AutoIncrement, { inc_field: 'userId' });

// const User = connection.model('User', UserSchema);

// export default User;
