// src/utils/rellenar_pdf.utils.ts
import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";

export async function rellenarCamposPDF(
  datos: Record<string, string>,
): Promise<Buffer> {
  const pdfPath = path.join(__dirname, "../../contrato.pdf");
  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();

  // Recorre el JSON y llena cada campo
  for (const [campo, valor] of Object.entries(datos)) {
    try {
      form.getTextField(campo).setText(valor);
    } catch {
      console.warn(`⚠️  Campo no encontrado: "${campo}"`);
    }
  }

  const pdfFinal = await pdfDoc.save();
  return Buffer.from(pdfFinal);
}
