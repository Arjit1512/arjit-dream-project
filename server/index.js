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
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import jwt from 'jsonwebtoken';
import Razorpay from 'razorpay';
import crypto from 'crypto';

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

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});


app.post('/checkout', auth, async (req, res) => {
    try {
        const userId = req.user._id;

        // Find user and populate cart
        const user = await User.findById(userId).populate('cart');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const cart = await Cart.findOne({ userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        const amount = cart.totalPrice * 100; // Razorpay expects amount in paise
        const receipt = `receipt_${Date.now()}`.slice(0, 40);  // Ensure the receipt length is within the limit

        // Create Razorpay order
        const order = await razorpay.orders.create({
            amount,
            currency: 'INR',
            receipt,
            notes: {
                userId: userId.toString()
            }
        });

        res.status(201).json({
            message: 'Order created successfully',
            order: {
                id: order.id,
                currency: order.currency,
                amount: order.amount,
                receipt: order.receipt,
                notes: order.notes
            }
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
// Webhook endpoint to handle Razorpay payment events
app.post('/razorpay-webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const receivedSignature = req.headers['x-razorpay-signature'];

    const generatedSignature = crypto.createHmac('sha256', secret)
                                      .update(JSON.stringify(req.body))
                                      .digest('hex');

    if (receivedSignature === generatedSignature) {
        const { event, payload } = req.body;

        if (event === 'payment.authorized' || event === 'payment.captured') {
            const paymentDetails = payload.payment.entity;
            const userId = paymentDetails.notes.userId;

            try {
                // Find the user's cart
                const cart = await Cart.findOne({ userId });
                if (!cart) {
                    throw new Error('Cart not found');
                }

                // Save current cart items and total price to user's totalOrders
                const user = await User.findById(userId);
                if (!user) {
                    throw new Error('User not found');
                }

                // Save cart items to totalOrders
                user.totalOrders.push({
                    items: cart.items,
                    totalBill: cart.totalPrice,
                    orderDate: new Date(),
                    userName: user.userName,
                    userEmail: user.email
                });

                // Clear the cart
                cart.items = [];
                cart.totalPrice = 0;

                // Save updated cart and user
                await cart.save();
                await user.save();

                // You can add additional order creation logic here if needed
                // Example: Create an order in Shiprocket

                res.status(200).send('Order created and cart cleared');
            } catch (error) {
                console.error('Error processing payment:', error);
                res.status(500).send('Error processing payment');
            }
        } else {
            res.status(400).send('Unhandled event type');
        }
    } else {
        res.status(403).send('Invalid signature');
    }
});

async function handleOrderCreation(paymentDetails) {
    const orderDetails = {
        // Populate order details from paymentDetails and your database
        // This includes customer details, shipping address, product details, etc.
    };

    // Create order in Shiprocket
    const shiprocketResponse = await axios.post('https://apiv2.shiprocket.in/v1/external/orders/create/adhoc', orderDetails, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SHIPROCKET_API_TOKEN}`
        }
    });

    if (shiprocketResponse.data.status_code !== 1) {
        throw new Error('Failed to create order in Shiprocket');
    }

    // Shiprocket will handle sending the email to the customer
}







// node mailer routes and functionalities

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});

const JWT_SECRET_OTP = process.env.JWT_SECRET_EMAIL_OTP;

app.post('/send-otp', (req, res) => {
    const { email } = req.body;
    const otp = otpGenerator.generate(6, { upperCase: false, specialChars: false });

    const otpToken = jwt.sign({ email, otp }, JWT_SECRET_OTP, { expiresIn: '10m' });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Your OTP for entering the Hood.',
        text:   `
                    Welcome to the Hood, Your OTP is ${otp}.
                `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Error sending OTP');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ otpToken });
        }
    });
});

app.post('/verify-otp', (req, res) => {
    const { email, otp, otpToken } = req.body;
    console.log(email, otp, otpToken);
    try {
        const decoded = jwt.verify(otpToken, JWT_SECRET_OTP);
        console.log(decoded.email, decoded.otp)
        if (decoded.email === email && decoded.otp === otp) {
            res.status(200).send('OTP verified');
        } else {
            res.status(400).send('Invalid OTP');
        }
    } catch (error) {
        res.status(400).send('Invalid or expired OTP');
    }
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));
