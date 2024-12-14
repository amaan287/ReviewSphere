import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

// Initialize Express, Mongoose, Cors, Dotenv, and Body Parser
const app = express();
dotenv.config(); // Load environment variables from .env file
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse incoming request bodies in JSON format
app.use("/", (req, res) => { res.send("Hello World"); }); // Define a simple route for the root URL

//import from dotenv
const port = process.env.PORT;
const mongodbUri = process.env.MONGODB_URI;
// Import Routes


// Connect to MongoDB
try {
    mongoose.connect(mongodbUri).then(() => {
        console.log("Connected to MongoDB");
        try {
            app.listen(port, () => console.log(`Server is running on port: http://localhost:${port}`))
        }
        catch (error) {
            console.log("Error running server:  ", error)
        }
    })
} catch (error) {
    console.log("Error connecting Mongodb: ", error)
}