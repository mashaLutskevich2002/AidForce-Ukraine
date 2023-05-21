const express = require("express");
const connectMongoDB = require("./config/db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cors = require("cors");
const { userInfo } = require("./controllers/userControllers");
const { authMiddleware } = require("./middlewares/authMiddleware");
const {
  addCollection,
  getCollections,
  getCollectionById,
  closeCollection,
} = require("./controllers/collectionControllers");

const app = express();
dotenv.config();
connectMongoDB();
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

app.use("/api/users", userRoutes);
app.get("/api/users/info", authMiddleware, userInfo);
app.post("/api/collection", authMiddleware, addCollection);
app.get("/api/collections", getCollections);
app.get("/api/collection/:id", getCollectionById);
app.put("/api/closeCollection/:id", authMiddleware, closeCollection);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
