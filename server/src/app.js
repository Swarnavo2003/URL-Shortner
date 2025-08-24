import dotenv from "dotenv";
dotenv.config({ path: "./.env", quiet: true });
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.routes.js";
import shortUrlRoutes from "./routes/short_url.routes.js";
import { redirectFromShortUrl } from "./controllers/short_url.controller.js";
import { errorHandler } from "./utils/error-handler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/short-url", shortUrlRoutes);
app.get("/:id", redirectFromShortUrl);

app.use(errorHandler);

export default app;
