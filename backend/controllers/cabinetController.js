const asyncHandler = require("express-async-handler");
const Collection = require("../models/collectionModel");
const Application = require("../models/applicationModel");

const getCabinet = asyncHandler(async (req, res) => {
  const { user } = req;

  try {
    const userCollections = await Collection.find({
      "user.id": user._id.toString()
    }).sort({ createdAt: -1 });

    const userApplications = await Application.find({
      "requestedCollection.user.id": user._id.toString()
    }).sort({ createdAt: -1 });

    res.json({
      collections: userCollections,
      applications: userApplications,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { getCabinet };
