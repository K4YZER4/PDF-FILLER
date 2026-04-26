import { Router } from "express";
import { escanearEstadoCuenta } from "../controllers/escanear_Estado_Cuenta.controllers";
import upload from "../middlewares/validar_imagen.middlewares";
const routerEstadoCuenta = Router();
routerEstadoCuenta.post(
  "/escanear-estado-cuenta",
  upload.single("estadoCuenta"),
  escanearEstadoCuenta,
);
export { routerEstadoCuenta };
