const mongoose = require("mongoose");

const collectionSchema = mongoose.Schema(
  {
    amount: { type: "Number", required: true },
    title: { type: "String", required: true },
    description: { type: "String", required: true },
    picUrl: { type: "String", required: true },
    location: { type: "String", required: true },
    monoBankaUrl: { type: "String", required: true },
    collectedSum: { type: "Number" },
    report: {
      photoUrl: { type: "String" },
      description: { type: "String" },
    },
    user: {
      id: { type: "String" },
      name: { type: "String" },
      last_name: { type: "String" },
      role: { type: "String" },
      phone: { type: "String" },
    },
  },
  { timestamps: true }
);

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection;
