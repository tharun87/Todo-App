import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes"

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 8080;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI as string);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(
      "MongoDB connection error:",
      error instanceof Error ? error.message : error,
    );
    process.exit(1);
  }
};

connectDB();

app.get("/",(req,res)=>{
    res.json({message: "API is working correctly"})
    res.send("Beckedn API is running")
})

app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
