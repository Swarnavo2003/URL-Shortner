import { nanoid } from "nanoid";
import QRCode from "qrcode";

export const generateNanoId = (length) => {
  return nanoid(length);
};

export const generateQrCode = (url) => {
  return QRCode.toDataURL(url);
};
