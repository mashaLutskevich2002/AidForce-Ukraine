const asyncHandler = require("express-async-handler");
const Collection = require("../models/collectionModel");
const User = require("../models/userModel");

const getCompanyById = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const companyCollections = await Collection.find({
      "user.id": userId,
    });

    res.json({
      user: {
        name: user.name,
        last_name: user.last_name,
        photoUrl: user.photoUrl,
        role: user.role,
        createdAt: user.createdAt,
        email: user.email,
        phone: user.phone,
      },
      collections: companyCollections,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { getCompanyById };
