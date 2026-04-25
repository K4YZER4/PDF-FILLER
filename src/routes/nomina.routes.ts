import { Router } from "express";
import upload from "../middlewares/validar_imagen.middlewares";
import { validarNominas } from "../middlewares/validar_Nominas.middlewares";
import { escanearNomina } from "../controllers/escnear_Nomina.controller";

// ─── FUTURO: agrega aquí el controller de escanear INE cuando lo tengas ───
// import { escanearINE } from "../controllers/ine.controller";

const router = Router();

// POST /api/nomina/escanear-nomina
router.post(
  "/escanear-nomina",
  upload.fields([
    { name: "nomina1", maxCount: 1 },
    { name: "nomina2", maxCount: 1 },
  ]),
  validarNominas,
  escanearNomina,
);

// ─── FUTURO: ruta para escanear INE ───
// router.post("/escanear-ine", upload.single("ine"), escanearINE);

export { router as nominaRouter };
