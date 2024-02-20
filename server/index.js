import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"; // Fix the typo here
import cors from 'cors';
import bodyParser from "body-parser";
import userRoutes from './routes/user.js';
import videoRoutes from './routes/video.js';
import path from 'path';

const app = express();
dotenv.config(); // Fix the typo here

app.use(cors()); // Call cors as a function
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello');
});  
app.use(express.json({limit:"300mb",extended:true}))
app.use(express.urlencoded({limit:"300mb",extended:true}))
app.use('/uploads',express.static(path.join('uploads')))

app.use('/user', userRoutes);
app.use('/video', videoRoutes);


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
