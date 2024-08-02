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
    const { userId } = req.user;  // Assume user ID is sent in the request or retrieved from auth middleware

    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === razorpay_signature) {
        try {
            // Verify payment and create order in your system
            const user = await User.findById(userId).populate('cart');
            const cart = await Cart.findOne({ userId });

            if (!user || !cart || cart.items.length === 0) {
                return res.status(400).json({ error: 'Invalid cart data' });
            }

            // Map cart items to include totalBill
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

            // Add cart items to user's total orders
            user.totalOrders.push(...totalOrders);
            await user.save();

            // Clear the cart
            cart.items = [];
            cart.totalPrice = 0;
            await cart.save();

            res.status(200).json({ message: "Payment verified and order created successfully" });
        } catch (error) {
            console.error('Error during payment verification:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(400).json({ error: "Invalid signature, verification failed" });
    }
};
