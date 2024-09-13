import mongoose from "mongoose";
import dotenv from "dotenv";

// Carregar variáveis de ambiente
dotenv.config();

export const mongoConnect = async () => {
    try {
        console.log("Connecting to MongoDB");
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB", err);
    }
};