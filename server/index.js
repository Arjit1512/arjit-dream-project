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


// ... other routes and server setup

dotenv.config();
const app = express();
const allowedOrigins = [
    "http://localhost:3000",  // Your frontend origin
];

app.use(cors({
    origin: function(origin, callback) {
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

/*USER ROUTES*/
app.post("/auth/login", (req, res) => {
    login(req, res);
    console.log("JWT Secret:", process.env.JWT_SECRET);
});
app.post("/auth/register", (req, res) => {
    register(req, res);
});


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

/*CART ROUTES*/
app.post('/add-to-cart', auth, async (req, res) => {
    const { productId, quantity, size } = req.body; // Ensure size is included in req.body
    const userId = req.user._id;

    try {
        const product = products.find(p => p.id === parseInt(productId));
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const price = product.price * quantity;
        const name = product.name; // Get product name

        let existingCartItem = await Cart.findOne({ userId, productId, size });

        if (existingCartItem) {
            existingCartItem.quantity += quantity;
            existingCartItem.price += price;
            await existingCartItem.save();
            return res.status(200).json({ message: 'Quantity updated in cart successfully' });
        } else {
            const newCartItem = await Cart.create({ userId, productId, quantity, price, name, size });
            const user = await User.findByIdAndUpdate(
                userId,
                { $push: { cart: newCartItem._id } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            return res.status(201).json({ message: 'Item added to cart successfully' });
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



app.get('/get-cart', auth, async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await User.findById(userId).populate('cart').exec();

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.cart || user.cart.length === 0) {
            return res.status(404).json({ error: 'User does not have any items in the cart' });
        }

        const totalPrice = user.cart.reduce((total, item) => {
            return total + (item.price ? item.price : 0);
        }, 0);

        res.status(200).json({ cart: user.cart, totalPrice, userName:user.userName });
    } catch (error) {
        console.error('Error fetching cart data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/update-cart', auth, async (req, res) => {
    const { productId, action, size } = req.body;
    const userId = req.user._id;

    try {
        let cartItem;
        if (size) {
            cartItem = await Cart.findOne({ userId, productId, size });
        } else {
            // Fallback to finding by productId only if size is not provided
            cartItem = await Cart.findOne({ userId, productId });
        }

        if (!cartItem) {
            console.log('Cart item not found for userId:', userId, 'and productId:', productId, 'and size:', size);
            return res.status(404).json({ error: 'Cart item not found' });
        }

        const product = products.find(p => p.id === parseInt(productId));
        if (!product) {
            console.log('Product not found with id:', productId);
            return res.status(404).json({ error: 'Product not found' });
        }

        if (action === 'increase') {
            console.log('Increasing quantity for productId:', productId, 'and size:', size);
            cartItem.quantity += 1;
            cartItem.price += product.price;
            await cartItem.save(); // Save the updated cart item
        } else if (action === 'decrease') {
            console.log('Decreasing quantity for productId:', productId, 'and size:', size);
            cartItem.quantity -= 1;
            cartItem.price -= product.price;

            if (cartItem.quantity <= 0) {
                await Cart.deleteOne({ _id: cartItem._id });
                await User.findByIdAndUpdate(userId, { $pull: { cart: cartItem._id } });
            } else {
                await cartItem.save();
            }
        } else {
            await cartItem.save();
        }

        const user = await User.findById(userId).populate('cart').exec();
        
        if (!user) {
            console.log('User not found with id:', userId);
            return res.status(404).json({ error: 'User not found' });
        }

        const totalPrice = user.cart.reduce((total, item) => total + item.price, 0);

        console.log('Updated cart:', user.cart); // Add this line
        return res.status(200).json({ cart: user.cart, totalPrice });
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
            {
                $push: {
                    feedback: { message, fName, lName, subject }
                }
            },
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

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
