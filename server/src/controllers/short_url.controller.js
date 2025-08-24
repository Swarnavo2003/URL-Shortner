import { ApiError, NotFoundError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import urlSchema from "../models/shortUrl.model.js";
import { generateNanoId, generateQrCode } from "../utils/helper.js";

export const createShortUrl = asyncHandler(async (req, res) => {
  const { url } = req.body;
  const userId = req.user?.id;

  if (!url) {
    throw new ApiError(400, "URL is required");
  }

  const shortUrl = generateNanoId(7);
  let newUrl;
  if (userId) {
    newUrl = new urlSchema({
      destination: url,
      short_url: shortUrl,
      user: userId,
    });

    await newUrl.save();
  } else {
    newUrl = new urlSchema({
      destination: url,
      short_url: shortUrl,
    });
    await newUrl.save();
  }

  let qrCodeImage = await generateQrCode(url);
  if (!qrCodeImage) {
    throw new ApiError(500, "Failed to generate QR code");
  } else {
    newUrl.qr_code = qrCodeImage;
    await newUrl.save();
  }

  res.status(201).json(
    new ApiResponse(
      201,
      {
        id: newUrl._id,
        destination: newUrl.destination,
        short_url: process.env.APP_URL + newUrl.short_url,
        qr_code: newUrl.qr_code,
        description: newUrl.description,
        clicks: newUrl.clicks,
        createdAt: newUrl.createdAt,
      },
      "Short URL created successfully"
    )
  );
});

export const getAllShortUrls = asyncHandler(async (req, res) => {
  const shortUrls = await urlSchema.find({});

  if (!shortUrls || shortUrls.length === 0) {
    throw new NotFoundError("No short URLs found");
  }

  const formattedUrls = shortUrls.map((url) => ({
    id: url._id,
    destination: url.destination,
    short_url: process.env.APP_URL + url.short_url,
    description: url.description,
    clicks: url.clicks,
    createdAt: url.createdAt,
  }));

  res
    .status(200)
    .json(
      new ApiResponse(200, formattedUrls, "Short URLs fetched successfully")
    );
});

export const redirectFromShortUrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const url = await urlSchema.findOneAndUpdate(
    { short_url: id },
    { $inc: { clicks: 1 } },
    { new: true }
  );

  if (!url) {
    throw new NotFoundError("Short URL not found");
  }

  const io = req.app.get("io");

  if (io) {
    io.emit("click-update", {
      urlId: url._id,
      shortUrl: url.short_url,
      destination: url.destination,
      clickCount: url.clicks,
      timestamp: new Date(),
    });

    console.log(
      `Real-time update sent to all clients: ${url.short_url} - ${url.clicks} clicks`
    );
  }

  res.redirect(url.destination);
});
