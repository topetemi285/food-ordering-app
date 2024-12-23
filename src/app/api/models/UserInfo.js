import { Schema, models, model } from "mongoose";
import { type } from "os";

const UserInfoSchema = new Schema(
  {
    email: { type: String, required: true },
    streetAddress: { type: String },
    postalCode: { type: String },
    city: { type: String },
    country: { type: String },
    phone: { type: String },
    // admin: { type: Boolean, default: false },
  },
  { timeStamp: true }
);

export const UserInfo = models?.UserInfo || model("UserInfo", UserInfoSchema);
