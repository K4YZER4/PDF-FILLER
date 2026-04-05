import { Request, Response } from "express";
import { generarContrato } from "../services/rellenar_pdf.services";

export const rellenarPDF = async (req: Request, res: Response) => {
  try {
    const contrato = req.body;
    const pdfBuffer = await generarContrato(contrato);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=contrato.pdf", //Inline se usa cuando queremos que el contrato se previsualize y attachment cuando queremos descarglo sin visualizarlo
    });
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error generating contract:", error);
    res.status(500).json({ error: "Failed to generate contract" });
  }
};
