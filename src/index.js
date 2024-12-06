import express from "express";
import cors from "cors";
import router from "./Routes/auth.routes.js";
import connectDB from './config/database.js';
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});