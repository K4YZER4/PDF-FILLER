import { Request, Response } from "express";
import { escanearINE } from "../services/escanear_INE.services";

export async function escanearINEController(req: Request, res: Response) {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No se recibió ninguna imagen" });
      return;
    }
    const resultado = await escanearINE(req.file.buffer);
    res.json(resultado);
  } catch (error) {
    console.error("Error al escanear el INE:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
