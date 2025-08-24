import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post(
  "/register",
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  registerUser
);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

export default router;
