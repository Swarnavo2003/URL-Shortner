import express from "express";
import {
  createShortUrl,
  getAllShortUrls,
} from "../controllers/short_url.controller.js";

const router = express.Router();

router.post("/create", createShortUrl);
router.get("/all", getAllShortUrls);

export default router;
