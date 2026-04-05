import { Request, Response, NextFunction } from "express";
export function validarMontoQuincenal(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { monto, quincenas } = req.body;
  if (!monto || !quincenas) {
    res
      .status(400)
      .json({ error: "Faltan parámetros: monto y quincenas son requeridos" });
    return;
  }
  const montoNum = Number(monto);
  const quincenasNum = Number(quincenas);
  if (isNaN(montoNum) || isNaN(quincenasNum)) {
    res.status(400).json({
      error: "Parámetros inválidos: monto y quincenas deben ser números",
    });
    return;
  }
  const plazosValidos = [24, 36, 48, 72, 96, 120];
  if (!plazosValidos.includes(quincenasNum)) {
    res.status(400).json({
      error: `quincenas inválido. Valores permitidos: ${plazosValidos.join(", ")}`,
    });
    return;
  }
  next();
}
