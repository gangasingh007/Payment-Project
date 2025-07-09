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

// *{
//     margin: 0;
//     padding: 0;
//     font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
//   }
  
//   body {
//     min-height: 100vh;
//     background-color: #0f0f12;
//     background-image: 
//       radial-gradient(circle at 20% 30%, rgba(200, 0, 255, 0.067) 0%, transparent 40%),
//       radial-gradient(circle at 80% 70%, rgba(255, 123, 0, 0.075) 0%, transparent 45%),
//       linear-gradient(120deg, rgba(0, 0, 0, 0.473) 0%, rgba(0, 0, 0, 0.26) 100%);
//     color: #e2e8f0;
//     background-repeat: no-repeat;
//     background-attachment: fixed;
//     background-size: cover;
//     transition: background 0.3s ease-in-out;
//   }
  