const asyncHandler = require("express-async-handler");
const Application = require("../models/applicationModel");
const Collections = require("../models/collectionModel");
const Collection = require("../models/collectionModel");

const addApplication = asyncHandler(async (req, res) => {
  const { user } = req;
  const { amount, title, description, picUrl, location, monoBankaUrl, status } =
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
  if (!location) {
    res.status(400);
    throw new Error("Оберіть локацію");
  }

  if (!description) {
    res.status(400);
    throw new Error("Заповніть поле опис ");
  }

  if (!picUrl) {
    res.status(400);
    throw new Error("Додайте фото");
  }

  try {
    const application = await Application.create({
      status: status,
      requestedCollection: {
        amount,
        title,
        description,
        picUrl,
        location,
        monoBankaUrl,
        user: {
          id: user?._id,
          name: user?.name,
          last_name: user?.last_name,
          role: user?.role,
          phone: user?.phone,
          photoUrl: user?.photoUrl,
        },
      },
    });

    res.json({
      status: application.requestedCollection.status,
      requestedCollection: {
        amount: application.requestedCollection.amount,
        title: application.requestedCollection.title,
        description: application.requestedCollection.description,
        picUrl: application.requestedCollection.picUrl,
        location: application.requestedCollection.location,
        monoBankaUrl: application.requestedCollection.monoBankaUrl,
        user: application.requestedCollection.user,
      },
    });
  } catch (error) {
    console.error("Failed to send data to Monobank", error);
  }
});

const getApplications = asyncHandler(async (req, res) => {
  const { page } = req.query;
  const pageNumber = parseInt(page) || 1;
  const pageSize = 30;
  const applications = await Application.find()
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .exec();

  const totalApplications = await Application.countDocuments();
  const totalPages = Math.ceil(totalApplications / pageSize);

  res.json({
    applications,
    totalPages,
  });
});

const sendApplicationsStatus = asyncHandler(async (req, res) => {
  const { id, status } = req.body;
  try {
    // Знайти заявку за ідентифікатором
    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ error: "Заявку не знайдено" });
    }
    // Змінити статус заявки
    application.status = status;
    // Перенести заявку в колекцію, якщо статус "одобрено"
    if (status === "Одобрено") {
      const collectionData = {
        amount: application.requestedCollection.amount,
        title: application.requestedCollection.title,
        description: application.requestedCollection.description,
        picUrl: application.requestedCollection.picUrl,
        location: application.requestedCollection.location,
        monoBankaUrl: application.requestedCollection.monoBankaUrl,
        user: application.requestedCollection.user,
      };
      // Створити нову колекцію в базі даних
      await Collections.create(collectionData);
    }
    application.status = status;
    // Зберегти зміни в заявці
    await application.save();

    res.status(200).json({
      message: "Статус заявки успішно змінено",
      status: application.status,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Помилка сервера" });
  }
});

const deleteApplication = asyncHandler(async (req, res) => {
  const applicationId = req.params.id;

  const application = await Application.findById(applicationId);

  if (!application) {
    res.status(404);
    throw new Error("Application not found");
  }

  await application.deleteOne();

  res.json({ message: "Application deleted successfully" });
});

module.exports = {
  addApplication,
  getApplications,
  sendApplicationsStatus,
  deleteApplication,
};
