import { Router } from "express";
import { validarMontoQuincenal } from "../middlewares/monto_quincenal.middlewares";
import { filtrarTablaController } from "../controllers/monto_quincena.controllers";

const router = Router();

router.post("/filtrar-tabla", validarMontoQuincenal, filtrarTablaController);

export default router;
