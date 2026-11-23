import express from 'express';
import urlRoutes from './routes/url.js';
import userRoutes from './routes/user.js';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Enable CORS
app.use(
    cors({
      origin: process.env.Frontend_API || "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

app.use('/', urlRoutes);
app.use('/user', userRoutes);

export default app;