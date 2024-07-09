import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { login, register, auth } from "./controllers/auth.js";
import User from "./models/User.js";
import Cart from "./models/Cart.js";
import products from './products.js'; // Import the products


dotenv.config();
const app = express();
const allowedOrigins = [
    "http://localhost:3000",  // Your frontend origin
];

// CORS middleware configuration
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
// Serve static files from the public directory
app.use(express.static('public'));

/*USER ROUTES*/
app.post("/auth/login", (req, res) => {
    login(req, res);
    console.log("JWT Secret:", process.env.JWT_SECRET); // This should log your JWT secret
})
app.post("/auth/register", (req, res) => {
    register(req, res);
})

/*CART ROUTES*/
// Assuming price calculation on server-side

// Assuming price calculation on server-side
app.post('/add-to-cart', auth, async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id; // Extract userId from auth middleware

    try {
        // Find product details (if needed)
        const product = products.find(p => p.id === parseInt(productId));
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Calculate price based on product and quantity
        const price = product.price * quantity;

        // Check if the product already exists in the user's cart
        let existingCartItem = await Cart.findOne({ userId, productId });

        if (existingCartItem) {
            // If the product exists, update the quantity and price
            existingCartItem.quantity += quantity;
            existingCartItem.price += price; // Update the price as well, if needed
            await existingCartItem.save();
            console.log('Existing cart item updated:', existingCartItem);
            return res.status(200).json({ message: 'Quantity updated in cart successfully' });
        } else {
            // If the product doesn't exist, create a new cart item
            const newCartItem = await Cart.create({ userId, productId, quantity, price });
            console.log('New cart item created:', newCartItem);

            // Update user's cart array
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
    const userId = req.user._id; // Assuming your auth middleware attaches user info to req.user

    try {
        const user = await User.findById(userId).populate('cart').exec();

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (!user.cart || user.cart.length === 0) {
            return res.status(404).json({ error: 'User does not have any items in the cart' });
        }

        // Calculate total price, handle cases where price might be null
        const totalPrice = user.cart.reduce((total, item) => {
            return total + (item.price ? item.price : 0); // Default to 0 if price is null or undefined
        }, 0);

        console.log('User:', user);
        console.log('Cart:', user.cart);
        console.log('Total Price:', totalPrice);

        res.status(200).json({ cart: user.cart, totalPrice });
    } catch (error) {
        console.error('Error fetching cart data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// app.get('/get-cart/:userId', auth, async (req, res) => {
//     const userId = req.params.userId;
//     try {
//         const user = await User.findById(userId).populate('cart').exec();
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }
//         if (!user.cart) {
//             return res.status(404).json({ error: 'User does not have a cart' });
//         }

//         // Calculate total price
//         const totalPrice = user.cart.reduce((total, item) => total + item.price, 0);

//         res.status(200).json({ cart: user.cart, totalPrice });
//     } catch (error) {
//         console.error('Error fetching cart data:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });

// For getting feedbacks
app.post("/community", auth, async (req, res) => {
    const userId = req.user._id; // Extract userId from auth middleware
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
