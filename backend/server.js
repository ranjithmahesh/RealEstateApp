import 'dotenv/config'
import cors from "cors";
import cookieParser from "cookie-parser"

import { userRoutes } from "./routes/userRouts.js";
import express from"express"
import { residenceyRoutes } from './routes/residenceyRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;



app.use(express.json());
app.use(cookieParser());
app.use(cors());


app.use("/api/user", userRoutes);
app.use("/api/residencey", residenceyRoutes);




app.listen(PORT, () => {
  console.log(`connected sucessufuly to ${PORT} port`);
});
