import express from "express";
import dotenv from "dotenv";
import connectDB from "./Config/database.js"
import userRoutes from "./Routes/User.routes.js"
import cookieParser from "cookie-parser";

const app = express();

dotenv.config({
    path: ".env"
})

connectDB();

// Middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

// Api
app.use(userRoutes);

app.listen(process.env.PORT,() => {
    console.log(`Server listen at port ${process.env.PORT}`);
});