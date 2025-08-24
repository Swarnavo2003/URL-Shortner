import User from "../models/user.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { username, firstName, lastName, email, password } = req.body;

  if (!username || !firstName || !lastName || !email || !password) {
    throw new Error("All fields are required");
  }

  const user = new User({
    username,
    firstName,
    lastName,
    email,
    password,
  });

  let avatarUrl;
  if (req.files && req.files.avatar && req.files.avatar.length > 0) {
    avatarUrl = req.files.avatar[0].path;
  }

  if (avatarUrl) {
    const result = await uploadOnCloudinary(avatarUrl, "avatars");

    user.avatar.url = result.secure_url;
    user.avatar.publicId = result.public_id;
  }

  await user.save();

  return res
    .status(201)
    .json(new ApiResponse(200, null, "Account created successfully"));
});

export const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username && !email && !password) {
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ username, email });
  if (!existingUser) {
    throw new Error("User not found");
  }

  const isPasswordMatch = await existingUser.isPasswordMatch(password);
  if (!isPasswordMatch) {
    throw new Error("Invalid password");
  }

  const { token, tokenExpiry } = await existingUser.generateAccessToken();

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(tokenExpiry),
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        existingUser,
        `Welcome Back ${existingUser.firstName} ${existingUser.lastName}`
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  return res
    .clearCookie("token")
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});
