import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  avatar: {
    type: {
      url: String,
      publicId: String,
    },
    default: {
      url: `https://placehold.co/600x400`,
      publicId: "",
    },
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: [true, "Username must be unique"],
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email must be unique"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatch = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1d" }
  );
  const tokenExpiry = Date.now() + 24 * 60 * 60 * 1000;
  return { token, tokenExpiry };
};

const User = mongoose.model("User", userSchema);
export default User;
