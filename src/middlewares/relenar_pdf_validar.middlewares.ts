import { Request, Response, NextFunction } from "express";
export function validarRellenarPDF(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { ine, tabla, extra, estadoCuenta, nomina } = req.body;
  if (!ine || !tabla || !extra) {
    res
      .status(400)
      .json({ error: "Faltan parámetros: ine, tabla y extra son requeridos" });
    return;
  }
  const plazosValidos = [24, 36, 48, 72, 96, 120];
  if (!plazosValidos.includes(Number(tabla.plazoQuincenas))) {
    res.status(400).json({
      error: `quincenas inválido. Valores permitidos: ${plazosValidos.join(", ")}`,
    });
    return;
  }

  next();
}
