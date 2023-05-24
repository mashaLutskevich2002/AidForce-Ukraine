import express from "express";
import { connectDB } from "./config/db";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";

import { notFound, errorHandler } from "./middlewares/errorMiddleware";
import cors from "cors";
import { userInfo, editUserInfo } from "./controllers/userControllers";
import { authMiddleware } from "./middlewares/authMiddleware";
import {
  addCollection,
  getCollections,
  getCollectionById,
  closeCollection,
} from "./controllers/collectionControllers";
import { getCabinet } from "./controllers/cabinetController";

const app = express();
dotenv.config();
connectDB();
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

app.use("/api/users", userRoutes);
app.get("/api/users/info", authMiddleware, userInfo);
app.post("/api/collection", authMiddleware, addCollection);
app.get("/api/collections", getCollections);
app.get("/api/collection/:id", getCollectionById);
app.put("/api/closeCollection/:id", authMiddleware, closeCollection);
app.get("/api/cabinet", authMiddleware, getCabinet);
app.put("/api/edit", authMiddleware, editUserInfo);

// app.get("/api/searchCollections", searchCollections);
app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
