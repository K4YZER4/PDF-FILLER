import { Router } from "express";
import { validarRellenarPDF } from "../middlewares";
import { rellenarPDF } from "../controllers";
const router = Router();

router.post("/rellenar-pdf", validarRellenarPDF, rellenarPDF);

export { router as routerPDF };
