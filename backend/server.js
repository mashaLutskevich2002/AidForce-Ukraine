const express = require("express");
const connectMongoDB = require("./db");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");

const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const cors = require("cors");
const {
  userInfo,
  editUserInfo,
  deleteUser,
} = require("./controllers/userControllers");
const { authMiddleware } = require("./middlewares/authMiddleware");
const {
  getCollections,
  getCollectionById,
  closeCollection,
  deleteCollection,
} = require("./controllers/collectionControllers");
const { getCabinet } = require("./controllers/cabinetController");
const {
  addApplication,
  getApplications,
  sendApplicationsStatus,
  deleteApplication,
} = require("./controllers/applicationContoller");
const { getCompanyById } = require("./controllers/companyController");
const { BASE_DIR } = require("./config");


console.log('BASE_DIR', BASE_DIR);

const HTML_FILE = `${BASE_DIR}/build/index.html`;

const app = express();
dotenv.config();
connectMongoDB();
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

app.use("/api/users", userRoutes);
app.get("/api/users/info", authMiddleware, userInfo);
app.delete("/api/users/delete/:id", authMiddleware, deleteUser);

app.get("/api/collection/getCollections", getCollections);
app.get("/api/collection/:id", getCollectionById);
app.put("/api/collection/closeCollection/:id", authMiddleware, closeCollection);
app.delete("/api/collection/delete/:id", authMiddleware, deleteCollection);

app.post("/api/application/createApplication", authMiddleware, addApplication);
app.get("/api/application/getApplications", authMiddleware, getApplications);
app.put(
  "/api/application/changeStatus",
  authMiddleware,
  sendApplicationsStatus
);
app.delete("/api/application/delete/:id", authMiddleware, deleteApplication);

app.put("/api/cabinet/edit", authMiddleware, editUserInfo);
app.get("/api/cabinet", authMiddleware, getCabinet);

app.get("/api/company/:id", getCompanyById);

app.use('/static', express.static(`${BASE_DIR}/build`));
app.get('*', (req, res) => {
  res.sendFile(HTML_FILE)
})

app.use(notFound);
app.use(errorHandler);



const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
