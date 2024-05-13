import mongoose from "mongoose";
import colors from "colors"
import dotenv from "dotenv";

dotenv.config({
    path : "../.env"
})

const connectDB = async () => {
    try {
      console;
      await mongoose.connect(process.env.MONGODB_URI);
      console.log(`Mongodb connected`.bgGreen.white);
    } catch (error) {
      console.log(`Mongodb Error :  ${error}`.bgRed.white);
    }
  };
  
 export default connectDB;