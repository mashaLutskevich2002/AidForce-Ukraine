const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema(
  {
    status: { type: String, default: "Нове" },
    requestedCollection: {
      amount: { type: Number },
      title: { type: String },
      description: { type: String },
      picUrl: { type: String },
      location: { type: String },
      monoBankaUrl: { type: String },
      user: {
        id: { type: String },
        name: { type: String },
        last_name: { type: String },
        role: { type: String },
        phone: { type: String },
        photoUrl: {
          type: String,
          default:
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
      },
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
