import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { login, register } from "./controllers/auth.js";
import User from "./models/User.js";
import Cart from "./models/Cart.js";

dotenv.config();
 const allowedOrigins = [
     "https://arjit-dream-fashion.vercel.app",
     "http://localhost:3000",
 ];
const app = express();
app.use(cors({
    origin: allowedOrigins,
    methods: ["POST", "GET"],
    credentials: true
}));
//app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extented: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extented: true }));


/*USER ROUTES*/
app.post("/auth/login", (req, res) => {
    login(req, res);
})
app.post("/auth/register", (req, res) => {
    register(req, res);
})

/*CART ROUTES*/
app.post("/add-to-cart/:userId", async (req, res) => {
    const userId = req.params.userId;
    const { productId, quantity } = req.body;

    try {
        const cartItem = await Cart.create({ userId, productId, quantity });

        // Find the user by userId and update the cart array
        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { cart: cartItem._id } },
            { new: true } // This ensures that the updated user document is returned
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(201).json({ message: "Item added to cart successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/get-cart/:userId", async (req, res) => {
    const userId = req.params.userId; // Assuming userId is the user's _id

    try {
        const user = await User.findById(userId).populate('cart').exec();
        res.status(200).json({ cart: user.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
