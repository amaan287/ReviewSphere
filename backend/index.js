import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';
import authRouter from './routes/auth.route.js';

// Initialize Express, Mongoose, Cors, Dotenv, and Body Parser
const app = express();
const prisma = new PrismaClient(); // Initialize Prisma Client
dotenv.config(); // Load environment variables from .env file
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json());
app.use(bodyParser.json()); // Parse incoming request bodies in JSON format


// app.use("/", (req, res) => { res.send("Hello World"); }); // Define a simple route for the root URL

//import from dotenv
const port = process.env.PORT;
// initialising  Routes
app.use('/api/v1/auth', authRouter);

// listening to the server
try {
    app.listen(port, () => console.log(`Server is running on port: http://localhost:${port}`))
}
catch (error) {
    console.log("Error running server:  ", error)
}
