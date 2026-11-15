import express from 'express';
import dotenv from 'dotenv';
import todoRoutes from './routes/todo.route.js';
import userRoutes from './routes/user.route.js';
import { connectDB } from './db/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser()); // Middleware to parse cookies
app.use(cors({
    origin: "http://localhost:5173", credentials: true,
})); // Enable CORS for requests from the frontend
app.use("/todo", todoRoutes); // Use the todo routes for any requests to /todos
app.use("/user", userRoutes); // Use the user routes for any requests to /users


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});