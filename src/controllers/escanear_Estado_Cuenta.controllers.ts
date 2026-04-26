import { extraerDatosEstadoCuentaServices } from "../services/escanear_Estado_Cuenta.services";
import { Request, Response } from "express";
async function escanearEstadoCuenta(req: Request, res: Response) {
  try {
    const datos = await extraerDatosEstadoCuentaServices(req.file!.buffer);
    res.json({ datos });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export { escanearEstadoCuenta };
