import express from 'express';
import urlRoutes from './routes/url.js';
import userRoutes from './routes/user.js';
import cors from 'cors';
const app = express();
import dotenv from "dotenv";

dotenv.config();
// Enable CORS
app.use(
    cors({
      origin: ["https://linkly-olive.vercel.app/", "http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', urlRoutes);
app.use('/user', userRoutes);



export default app;