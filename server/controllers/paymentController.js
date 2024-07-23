import Razorpay from "razorpay";
import crypto from "crypto";

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

    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex');

    if (generatedSignature === razorpay_signature) {
        res.status(200).json({ message: "Payment verified successfully" });
    } else {
        res.status(400).json({ error: "Invalid signature, verification failed" });
    }
};
