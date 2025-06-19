import express from 'express';
import cors from 'cors';    
import { connectDB } from './Db/Db.js';
import mainrouter from './Routes/index.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    

app.use("/api/v1",mainrouter)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});