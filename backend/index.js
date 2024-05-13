import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/database.js"
import userRoutes from "./Routes/User.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config({
    path: ".env"
})

connectDB();
const corsOptions = {
    origin : "http://localhost:5173",
    credentials: true
}

// Middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Api
app.use(userRoutes);

app.listen(process.env.PORT,() => {
    console.log(`Server listen at port ${process.env.PORT}`);
});