import Razorpay from "razorpay";
import crypto from "crypto";
import User from '../models/User.js';  // Import your User model
import Cart from '../models/Cart.js';  // Import your Cart model

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
    const { amount, currency, receipt, notes } = req.body;

    try {
        const order = await razorpay.orders.create({ amount, currency, receipt, notes });
        res.status(200).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const userId = req.user?._id;  // Accessing userId with a fallback

    console.log('Request user:', req.user);  // Debug log
    console.log('User ID from request:', userId);

    if (!userId) {
        return res.status(401).json({ error: 'User ID is missing' });
    }

    try {
        // Verify the signature
        const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const generatedSignature = hmac.digest('hex');

        console.log('Received signature:', razorpay_signature);
        console.log('Generated signature:', generatedSignature);

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ error: "Invalid signature, verification failed" });
        }

        // Fetch user
        const user = await User.findById(userId).populate('cart');
        if (!user) {
            console.error('User not found:', userId);
            return res.status(404).json({ error: 'User not found' });
        }

        // Fetch cart
        const cart = await Cart.findOne({ userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ error: 'Invalid cart data' });
        }

        // Process cart and save order
        const totalOrders = [{
            items: cart.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                name: item.name,
                size: item.size,
            })),
            totalBill: cart.totalPrice,
            orderDate: new Date(),
        }];

        user.totalOrders.push(...totalOrders);
        await user.save();

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(200).json({ message: "Payment verified and order created successfully" });
    } catch (error) {
        console.error('Error during payment verification:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
