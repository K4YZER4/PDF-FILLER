import { Request, Response, NextFunction } from "express";
export function validarRellenarPDF(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { ine, tabla, extra } = req.body;
  if (!ine || !tabla || !extra) {
    res
      .status(400)
      .json({ error: "Faltan parámetros: ine, tabla y extra son requeridos" });
    return;
  }
  next();
}
