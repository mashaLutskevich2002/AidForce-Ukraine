import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
  phone: string;
  militaryTicket: string;
  cardNumber: string;
  photoUrl: string;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: { type: String },
    last_name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    role: {
      type: String,
      default: "volunteer",
    },
    phone: {
      type: String,
    },
    militaryTicket: {
      type: String,
    },
    cardNumber: {
      type: String,
    },
    photoUrl: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
