import express from 'express';
import cors from 'cors';    
import { connectDB } from './Db/Db.js';
import mainrouter from './Routes/index.js';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(cors());
const PORT =  3000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/v1",mainrouter)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});