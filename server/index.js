import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { login, register, auth } from "./controllers/auth.js";
import User from "./models/User.js";
import Cart from "./models/Cart.js";
import products from './products.js'; // Import the products
import BlacklistToken from './models/BlackListToken.js';
import { createOrder, verifyPayment } from './controllers/paymentController.js';
dotenv.config();
const app = express();
const allowedOrigins = [
    "http://localhost:3000",  // Your local frontend origin
    "https://arjit-dream-fashion.vercel.app",  // Your Vercel domain
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST"],
    credentials: true  // Enable sending cookies across domains
}));

app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static('public'));

/* USER ROUTES */
app.post("/auth/login", (req, res) => {
    login(req, res);
    console.log("JWT Secret:", process.env.JWT_SECRET);
});
app.post("/auth/register", (req, res) => {
    register(req, res);
});

// Add Razorpay payment routes

app.post('/payment/create-order', auth, createOrder);
app.post('/payment/verify-payment', auth, verifyPayment);


app.post("/logout", auth, async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const blacklistedToken = new BlacklistToken({ token });
        await blacklistedToken.save();
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

/* CART ROUTES */
app.get('/get-cart', auth, async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findById(userId).populate({
            path: 'cart',
            populate: { path: 'items.productId' }  // Ensure products are populated
        }).exec();

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.cart || user.cart.length === 0) {
            return res.status(404).json({ error: 'User does not have any items in the cart' });
        }

        const totalPrice = user.cart.reduce((total, cartItem) => {
            return total + cartItem.items.reduce((itemTotal, item) => {
                return itemTotal + (item.price * item.quantity);
            }, 0);
        }, 0);

        return res.status(200).json({ cart: user.cart, totalPrice, userName: user.userName });
    } catch (error) {
        console.error('Error fetching user cart:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/add-to-cart', auth, async (req, res) => {
    const { productId, quantity, size } = req.body;
    const userId = req.user._id;

    try {
        // Find the product details
        const product = products.find(p => p.id === parseInt(productId));
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const price = product.price;
        const name = product.name;

        // Check if size is required and provided
        if (product.category !== 'Accessories' && !size) {
            return res.status(400).json({ error: 'Size is required to add item to cart' });
        }

        // Check if size is provided for an accessory item
        if (product.category === 'Accessories' && size) {
            return res.status(400).json({ error: 'Size is not needed for accessory items' });
        }

        // Find or create the user's cart
        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({ userId, items: [], totalPrice: 0 });
            await cart.save();
        }

        // Update the cart with new item or existing item
        const existingCartItemIndex = cart.items.findIndex(item => item.productId === productId && item.size === size);

        if (existingCartItemIndex !== -1) {
            // Update the quantity of the existing item
            cart.items[existingCartItemIndex].quantity += quantity;
        } else {
            // Add new item to the cart
            cart.items.push({ productId, quantity, price, name, size });
        }

        // Update the total price of the cart
        cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

        // Save the cart updates
        await cart.save();

        // Update user's cart association if not already associated
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if cart is already associated with user
        if (!user.cart.includes(cart._id.toString())) {
            user.cart.push(cart._id);
        }

        // Save the user with updated cart association
        await user.save();

        res.status(200).json({ message: 'Item added to cart successfully' });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/update-cart', auth, async (req, res) => {
    const { productId, action, size } = req.body;
    const userId = req.user._id;

    try {
        // Find the product in the products array or database
        const product = products.find(p => p.id === parseInt(productId));
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Find the user's cart
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Determine the index of the cart item to update
        const cartItemIndex = cart.items.findIndex(item => item.productId === productId && item.size === size);
        if (cartItemIndex === -1) {
            return res.status(404).json({ error: 'Cart item not found' });
        }

        // Update the quantity based on the action
        if (action === 'increase') {
            cart.items[cartItemIndex].quantity += 1;
        } else if (action === 'decrease') {
            if (cart.items[cartItemIndex].quantity <= 1) {
                cart.items.splice(cartItemIndex, 1); // Remove the item if quantity is 1 or less
            } else {
                cart.items[cartItemIndex].quantity -= 1;
            }
        } else {
            return res.status(400).json({ error: 'Invalid action' });
        }

        // Update the total price
        cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

        await cart.save();

        return res.status(200).json({ cart: cart.items, totalPrice: cart.totalPrice });
    } catch (error) {
        console.error('Error updating cart:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post("/community", auth, async (req, res) => {
    const userId = req.user._id;
    const { message, fName, lName, subject } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { feedback: { message, fName, lName, subject } } },
            { new: true }
        );
        if (!user) {
            return res.status(404).json({ error: "User does not exist" });
        }
        res.status(201).json({ message: "Thanks for your feedback!" });
    } catch (error) {
        console.error('Error updating user feedback:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.post('/checkout', auth, async (req, res) => {
    try {
        const userId = req.user._id;

        // Find the user's cart
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Calculate total price with tax and delivery charges
        const totalAmount = cart.totalPrice;

        // Create Razorpay order
        const orderOptions = {
            amount: totalAmount * 100, // amount in the smallest currency unit
            currency: "INR",
            receipt: `receipt_order_${userId}`,
            notes: {
                userId: userId.toString(),
                userName: req.user.userName
            }
        };

        const order = await razorpay.orders.create(orderOptions);

        // Save current cart items and total price to user's totalOrders
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.totalOrders.push({
            items: cart.items,
            totalBill: totalAmount,
            orderDate: new Date(),
            userName: user.userName,
            userEmail: user.email
        });

        // Clear the cart
        cart.items = [];
        cart.totalPrice = 0;

        await cart.save();
        await user.save();

        res.status(200).json({
            message: 'Checkout successful',
            user: {
                userName: user.userName,
                email: user.email,
                totalOrders: user.totalOrders
            },
            order
        });
    } catch (error) {
        console.error('Error during checkout:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/dashboard', auth, async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId).populate({
            path: 'totalOrders.items.productId',  // Populate product details in totalOrders
        }).exec();
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ user });
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add this route in your server file
app.post('/add-address', auth, async (req, res) => {
  const userId = req.user._id;
  const { street, city, state, pincode, landmark } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add new address to the addresses array
    user.address.push({
      street,
      city,
      state,
      pincode,
      landmark
    });

    await user.save();

    res.status(200).json({ message: 'Address added successfully', address: user.address });
  } catch (error) {
    console.error('Error adding address:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));
