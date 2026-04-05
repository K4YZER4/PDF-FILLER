import { Request, Response } from "express";
import { filtraTablaServices } from "../services/monto_quincena.services";

export async function filtrarTablaController(req: Request, res: Response) {
  try {
    const { monto, quincenas } = req.body;
    const resultado = await filtraTablaServices(
      Number(monto),
      Number(quincenas),
    );
    if (!resultado) {
      res.status(404).json({
        error: "No se encontró una fila que coincida con los parámetros dados",
      });
      return;
    } else res.json(resultado);
  } catch (error) {
    console.error("Error al filtrar la tabla:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
