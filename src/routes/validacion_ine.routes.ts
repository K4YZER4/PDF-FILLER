import { Router } from "express";
import upload from "../middlewares/validar_imagen.middlewares";
import { escanearINEController } from "../controllers/escanear_ine.controller";
const router = Router();

router.post("/escanear-ine", upload.single("ine"), escanearINEController);

export { router as routerINE };
