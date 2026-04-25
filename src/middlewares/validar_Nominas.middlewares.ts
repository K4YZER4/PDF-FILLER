import { Request, Response, NextFunction } from "express";

// Valida que lleguen exactamente los 2 campos: nomina1 y nomina2
function validarNominas(req: Request, res: Response, next: NextFunction) {
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };

  if (!files?.nomina1?.[0] || !files?.nomina2?.[0]) {
    res.status(400).json({
      error: "Se requieren exactamente 2 nóminas: nomina1 y nomina2",
    });
    return;
  }

  next();
}

export { validarNominas };
