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
import axios from 'axios';

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
                const totalBill = cart.totalPrice;
                user.totalOrders.push({
                    items: cart.items,
                    totalBill: totalBill,
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

                // Create order in Shiprocket
                await handleOrderCreation(paymentDetails, totalBill, user);

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

const shiprocketToken = process.env.SHIPROCKET_API_TOKEN;

async function handleOrderCreation(paymentDetails, totalBill, user) {
    try {
        const orderDetails = {
            order_id: `order_${Date.now()}`,
            order_date: new Date().toISOString(),
            pickup_location: "Primary",
            channel_id: "",
            comment: "Customer Order",
            billing_customer_name: user.userName,
            billing_last_name: "",
            billing_address: user.address[0].street,
            billing_address_2: "",
            billing_city: user.address[0].city,
            billing_pincode: user.address[0].pincode,
            billing_state: user.address[0].state,
            billing_country: "India",
            billing_email: user.email,
            billing_phone: user.phone,
            shipping_is_billing: true,
            shipping_customer_name: user.userName,
            shipping_last_name: "",
            shipping_address: user.address[0].street,
            shipping_address_2: "",
            shipping_city: user.address[0].city,
            shipping_pincode: user.address[0].pincode,
            shipping_country: "India",
            shipping_state: user.address[0].state,
            shipping_email: user.email,
            shipping_phone: user.phone,
            order_items: user.totalOrders[user.totalOrders.length - 1].items.map(item => ({
                name: item.name,
                sku: item.productId.toString(),
                units: item.quantity,
                selling_price: item.price,
                discount: 0,
                tax: 0,
                hsn: 123456
            })),
            payment_method: "RAZORPAY",
            shipping_charges: 0,
            giftwrap_charges: 0,
            transaction_charges: 0,
            total_discount: 0,
            sub_total: totalBill,
            length: 10,
            breadth: 15,
            height: 20,
            weight: 1.5
        };

        console.log('Order details:', orderDetails); // Log order details

        // Step 1: Create order in Shiprocket
        const shiprocketResponse = await axios.post(
            'https://apiv2.shiprocket.in/v1/external/orders/create/adhoc',
            orderDetails,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${shiprocketToken}`
                }
            }
        );

        if (shiprocketResponse.data && shiprocketResponse.data.status_code === 1) {
            console.log('Order successfully created in Shiprocket');
        } else {
            console.error('Error creating order in Shiprocket:', shiprocketResponse.data.message);
        }

        // Step 2: Assign AWB using the obtained shipment_id
        const { shipment_id } = shiprocketResponse.data;
        const assignAWBResponse = await axios.post('https://apiv2.shiprocket.in/v1/external/courier/assign/awb', {
            shipment_id: shipment_id,
            courier_id: 10 // Example courier_id, change as required
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${shiprocketToken}`
            }
        });

        console.log('Assign AWB response:', assignAWBResponse.data); // Log Assign AWB response

        return assignAWBResponse.data;

    } catch (error) {
        console.error('Error creating order in Shiprocket:', error);
        throw error; // Ensure errors are propagated to the webhook handler
    }
}

// async function trackShipment(shipment_id) {
//     try {
//         const trackResponse = await axios.get('https://apiv2.shiprocket.in/v1/external/courier/track/awb/', {
//             params: {
//                 shipment_id: shipment_id
//             },
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${shiprocketToken}`
//             }
//         });

//         console.log('Track response:', trackResponse.data); // Log Track response

//         return trackResponse.data;

//     } catch (error) {
//         console.error('Error tracking shipment in Shiprocket:', error);
//         throw error; // Ensure errors are propagated to the webhook handler
//     }
// }
// app.get('/order-tracking/:orderId', async (req, res) => {
//     try {
//         const { orderId } = req.params;
//         const response = await axios.get(`https://apiv2.shiprocket.in/v1/external/courier/track/awb/${orderId}`, {
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${process.env.SHIPROCKET_API_KEY}`
//             }
//         });

//         if (response.data.error) {
//             // Handle the error returned by Shiprocket
//             return res.status(404).json({ message: response.data.error });
//         }

//         res.json(response.data);
//     } catch (error) {
//         console.error('Error fetching tracking information:', error.message);
//         res.status(500).send('Error fetching tracking information');
//     }
// });

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
