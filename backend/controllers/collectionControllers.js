const asyncHandler = require("express-async-handler");
const Collection = require("../models/collectionModel.js");
const axios = require("axios");

const sendRequestToMonobank = async (collection) => {
  const monoBankaUrl = collection.monoBankaUrl;

  const extractedValue = monoBankaUrl.substring(
    monoBankaUrl.lastIndexOf("/") + 1
  );

  const url = "https://send.monobank.ua/api/handler";
  const requestData = {
    Pc: "BDFSuoEhYfMALOdZ5VV0soysxaX7hLq2d0wSPSfidphONkjSfSeTMAUWg/BVIUG80tpZimZbLSu2BXrVMM3XJL0=",
    c: "hello",
    clientId: extractedValue,
  };

  try {
    const response = await axios.post(url, requestData);
    const responseData = response.data.jarAmount;

    await Collection.findByIdAndUpdate(
      collection._id,
      { collectedSum: responseData },
      { new: true }
    );
  } catch (error) {
    console.error("Failed to send data to Monobank", error);
  }
};

const getCollections = asyncHandler(async (req, res) => {
  const { search_term = "", page } = req.query;
  const pageNumber = parseInt(page) || 1;
  const pageSize = 20;
  const militaryCollections = await Collection.find({
    title: { $regex: search_term, $options: "i" },
    "user.role": "military",
  })
    .sort({ report: 1, createdAt: -1 })
    .exec();

  const collectionList = await Collection.find();

  collectionList.forEach((collection) => {
    setInterval(() => {
      sendRequestToMonobank(collection);
    }, 1800000); //30хв
  });

  const nonMilitaryCollectionsQuery = Collection.find({
    title: { $regex: search_term, $options: "i" },
    "user.role": { $ne: "military" },
  })
    .sort({ report: 1, createdAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .exec();

  const nonMilitaryCollections = await nonMilitaryCollectionsQuery;

  const totalNonMilitaryCollections = await Collection.countDocuments({
    title: { $regex: search_term, $options: "i" },
    "user.role": { $ne: "military" },
  });
  const totalPages = Math.ceil(totalNonMilitaryCollections / pageSize);

  res.json({
    militaryCollections,
    nonMilitaryCollections,
    totalPages,
  });
});

const getCollectionById = asyncHandler(async (req, res) => {
  const collectionId = req.params.id;

  try {
    const collection = await Collection.findById(collectionId);
    if (!collection) {
      res.status(404).json({ error: "Collection not found" });
    }
    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const closeCollection = asyncHandler(async (req, res) => {
  const collectionId = req.params.id;
  const { photoUrl, description } = req.body;
  if (!photoUrl || !description){
    res.status(400);
    throw new Error("Заповніть всі поля");
  }

  const collection = await Collection.findById(collectionId);

  if (!collection) {
    res.status(404);
    throw new Error("Collection not found");
  }

  collection.report = {
    photoUrl,
    description,
  };

  const updatedCollection = await collection.save();

  res.json(updatedCollection);
});

const deleteCollection = asyncHandler(async (req, res) => {
  const collectionId = req.params.id;

  const collection = await Collection.findById(collectionId);

  if (!collection) {
    res.status(404);
    throw new Error("Collection not found");
  }

  await collection.deleteOne();

  res.json({ message: "Collection deleted successfully" });
});

module.exports = {
  closeCollection,
  getCollectionById,
  getCollections,
  deleteCollection,
};
