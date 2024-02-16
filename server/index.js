import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; // Fix the typo here
import cors from 'cors';
import bodyParser from "body-parser";
import userRoutes from './routes/user.js';

const app = express();
dotenv.config(); // Fix the typo here

app.use(cors()); // Call cors as a function
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello');
});  

app.use('/user', userRoutes);

const DB_URL = process.env.DB_URL;

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(DB_URL);
    console.log('Database connected');
}
 
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server Running on the PORT ${port}`);
});
