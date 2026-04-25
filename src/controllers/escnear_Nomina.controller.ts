import { Request, Response } from "express";
import { escanearNominaServices } from "../services/escanear_Nomina.services";

async function escanearNomina(req: Request, res: Response) {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const datos = await escanearNominaServices(
      files.nomina1[0].buffer,
      files.nomina2[0].buffer,
    );

    res.json({ datos });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export { escanearNomina };
