import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { login, register } from "./controllers/auth.js";

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


// to remove cors error
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
//     res.header("Access-Control-Allow-Headers", "Content-Type, X-Auth-Token, Origin, Authorization");
//     next();
// });

/*POST ROUTES*/
app.post("/auth/login", (req, res) => {
    login(req, res);
})
app.post("/auth/register", (req, res) => {
    register(req, res);
})

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URL);
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
