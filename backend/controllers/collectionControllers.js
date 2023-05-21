const asyncHandler = require("express-async-handler");
const Collection = require("../models/collectionModel");
const generateToken = require("../utils/generateToken");
const { post } = require("axios");

const addCollection = asyncHandler(async (req, res) => {
  const { user } = req;
  const { amount, title, description, picUrl, location, monoBankaUrl, report } =
    req.body;

  if (
    !amount &&
    !title &&
    !description &&
    !picUrl &&
    !location &&
    !monoBankaUrl
  ) {
    res.status(400);
    throw new Error("Заповніть всі поля");
  }

  if (!monoBankaUrl) {
    res.status(400);
    throw new Error("Додайте банку");
  }
  if (!amount) {
    if (!title) {
      res.status(400);
      throw new Error("Заповніть суму та назву збору");
    }
    if (!description) {
      res.status(400);
      throw new Error("Заповніть суму та опис збору");
    }
    res.status(400);
    throw new Error("Заповніть поле сума збору");
  }

  if (!title) {
    if (!description) {
      res.status(400);
      throw new Error("Заповніть назву та опис збору");
    }
    res.status(400);
    throw new Error("Заповніть поле назва збору");
  }

  if (!description) {
    res.status(400);
    throw new Error("Заповніть поле опис ");
  }

  if (!picUrl) {
    res.status(400);
    throw new Error("Додайте фото");
  }

  const url = "https://send.monobank.ua/api/handler";
  const extractedValue = monoBankaUrl.substring(
    monoBankaUrl.lastIndexOf("/") + 1
  );
  const requestData = {
    Pc: "BDFSuoEhYfMALOdZ5VV0soysxaX7hLq2d0wSPSfidphONkjSfSeTMAUWg/BVIUG80tpZimZbLSu2BXrVMM3XJL0=",
    c: "hello",
    clientId: extractedValue,
  };

  try {
    const response = await post(url, requestData);
    const responseData = response.data.jarAmount;
    // Обробка відповіді від сервера Monobank
    console.log(responseData);

    const collection = await Collection.create({
      amount,
      title,
      description,
      picUrl,
      location,
      monoBankaUrl,
      report,
      collectedSum: responseData, // Використовуємо значення responseData
      user: {
        id: user._id,
        name: user.name,
        last_name: user.last_name,
        role: user.role,
        phone: user.phone,
      },
    });

    res.json({
      amount: collection.amount,
      title: collection.title,
      description: collection.description,
      picUrl: collection.picUrl,
      location: collection.location,
      monoBankaUrl: collection.monoBankaUrl,
      report: collection.report,
      collectedSum: collection.collectedSum,
      user: collection.user,
      token: generateToken(user._id),
    });
  } catch (error) {
    // Обробка помилки запиту
    console.error("Failed to send data to Monobank", error);
  }
});

const getCollections = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  const pageNumber = parseInt(page) || 1;
  const pageSize = parseInt(limit) || 10;

  const militaryCollections = await Collection.find({ "user.role": "military" })
    .sort({ createdAt: -1 })
    .exec();

  const collectionList = await Collection.find();

  collectionList.forEach(async (collection) => {
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
      const response = await post(url, requestData);
      const responseData = response.data.jarAmount;

      await Collection.findByIdAndUpdate(
        collection._id,
        { collectedSum: responseData },
        { new: true }
      );
    } catch (error) {
      console.error("Failed to send data to Monobank", error);
    }
  });

  const nonMilitaryCollectionsQuery = Collection.find({
    "user.role": { $ne: "military" },
  })
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .exec();

  const nonMilitaryCollections = await nonMilitaryCollectionsQuery;

  const totalNonMilitaryCollections = await Collection.countDocuments({
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
      return res.status(404).json({ error: "Collection not found" });
    }
    res.json(collection);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const closeCollection = asyncHandler(async (req, res) => {
  const collectionId = req.params.id;
  const { photoUrl, description } = req.body;

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

module.exports = {
  addCollection,
  getCollections,
  getCollectionById,
  closeCollection,
};
