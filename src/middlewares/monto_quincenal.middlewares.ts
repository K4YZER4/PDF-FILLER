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
  next();
}
