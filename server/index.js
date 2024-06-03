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
    const { productId, quantity, } = req.body;

    try {
        // Check if the product already exists in the user's cart
        const existingCartItem = await Cart.findOne({ userId, productId });

        if (existingCartItem) {
            // If the product exists, update the quantity
            existingCartItem.quantity += quantity;
            await existingCartItem.save();
            res.status(200).json({ message: "Quantity updated in cart successfully" });
        } else {
            // If the product doesn't exist, create a new cart item
            const newCartItem = await Cart.create({ userId, productId, quantity, });

            // Find the user by userId and update the cart array
            const user = await User.findByIdAndUpdate(
                userId,
                { $push: { cart: newCartItem._id } },
                { new: true } // This ensures that the updated user document is returned
            );

            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            res.status(201).json({ message: "Item added to cart successfully" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/get-cart", async (req, res) => {
    try {
        const userData = await User.find();

        // Respond with the fetched data
        res.json({ data: userData });
    }
    catch (error) {
        console.log("Something is wrong. Try again!", error);
    }
})


app.get("/get-cart/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findById(userId).populate('cart').exec();
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (!user.cart) {
            return res.status(404).json({ error: 'User does not have a cart' });
        }
        res.status(200).json({ cart: user.cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

//for getting feedbacks
app.post("/community/:userId", async (req, res) => {
    const userId = req.params.userId;
    const { message, fName, lName, subject } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $push: { message: message, fName: fName, lName: lName, subject: subject } },
            { new: true }
        );
        if (!user) {
            res.status(404).json({ error: "User does not exist" });
        }
        res.status(201).json({ message: "Thanks for your feedback!" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }

})

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
