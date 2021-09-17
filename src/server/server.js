import express, { request } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoutes.js";
import workspaceRoute from "./routes/workspaceRoute.js";
const app = express();

dotenv.config();

const PORT = 4000;

app.use(express.json());

app.use(cors());
app.use("/api", userRoute);
app.use("/api", workspaceRoute);

mongoose
  .connect(process.env.DATABASE_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`))
  )
  .catch(() => console.log("Something went wrong"));
