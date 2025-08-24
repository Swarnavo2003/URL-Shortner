import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema(
  {
    destination: {
      type: String,
      required: true,
    },
    short_url: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    qr_code: {
      type: String,
      default: null,
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const shortUrl = mongoose.model("shortUrl", shortUrlSchema);
export default shortUrl;
