import { Request, Response } from "express";
import { escanearNominaServices } from "../services/escanear_Nomina.services";
import { NominaResponse } from "../types";
async function escanearNomina(req: Request, res: Response) {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const datos = await escanearNominaServices(
      files.nomina1[0].buffer,
      files.nomina2[0].buffer,
    );

    const response: NominaResponse = { datos };
    res.json(response);
  } catch (error: any) {
    console.error("Error al escanear las nóminas:", error);
    res.status(500).json({ error: error.message });
  }
}

export { escanearNomina };
