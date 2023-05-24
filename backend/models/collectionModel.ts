import mongoose, { Document, Schema } from "mongoose";

interface IReport {
  photoUrl: string;
  description: string;
}

interface IUser {
  id: string;
  name: string;
  last_name: string;
  role: string;
  phone: string;
}

interface ICollection {
  amount: number;
  title: string;
  description: string;
  picUrl: string;
  location: string;
  monoBankaUrl: string;
  collectedSum?: number;
  report?: IReport;
  user?: IUser;
}

export interface ICollectionDocument extends ICollection, Document {}

const collectionSchema = new Schema<ICollectionDocument>(
  {
    amount: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    picUrl: { type: String, required: true },
    location: { type: String, required: true },
    monoBankaUrl: { type: String, required: true },
    collectedSum: { type: Number },
    report: {
      photoUrl: { type: String },
      description: { type: String },
    },
    user: {
      id: { type: String },
      name: { type: String },
      last_name: { type: String },
      role: { type: String },
      phone: { type: String },
    },
  },
  { timestamps: true }
);

const Collection = mongoose.model<ICollectionDocument>(
  "Collection",
  collectionSchema
);

export default Collection;
