import multer from "multer";
import { Request } from "express";
const storage = multer.memoryStorage(); // guarda en RAM, no en disco

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // máximo 10MB
  fileFilter: (_req: Request, file: Express.Multer.File, cb: any) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    allowed.includes(file.mimetype)
      ? cb(null, true)
      : cb(new Error("Solo imágenes"));
  },
});

export default upload;
