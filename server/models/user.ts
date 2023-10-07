import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema({
  url: String,
  public_id: String,
  name: String,
  size: {
    type: Number,
    required: true,
  },
});

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  images: [imageSchema],
  storageUsed: {
    type: Number,
    default: 0,
    required: true,
  },
});

export default mongoose.model("user", userSchema);
