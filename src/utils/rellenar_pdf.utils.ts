// src/utils/rellenar_pdf.utils.ts
import { PDFDocument, TextAlignment } from "pdf-lib";
import fs from "fs";
import path from "path";

export async function rellenarCamposPDF(
  datos: Record<string, string>,
): Promise<Buffer> {
  const pdfPath = path.join(__dirname, "../../contrato.pdf");
  const pdfBytes = fs.readFileSync(pdfPath);
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();

  for (const [campo, valor] of Object.entries(datos)) {
    try {
      const field = form.getField(campo);
      const tipo = field.constructor.name;
      if (tipo === "PDFCheckBox") {
        // ✅ NUEVO: marcar/desmarcar checkbox
        const checkbox = form.getCheckBox(campo);
        if (valor === "Yes") {
          checkbox.check();
        } else {
          checkbox.uncheck();
        }
      } else if (tipo === "PDFDropdown") {
        // Dropdown: solo select, sin setAlignment
        form.getDropdown(campo).select(valor);
      } else {
        // TextField: setText + centrar
        const textField = form.getTextField(campo);
        textField.setText(valor);
        textField.setAlignment(TextAlignment.Center);
        textField.setFontSize(10);
      }
    } catch {
      console.warn(` Campo no encontrado: "${campo}"`);
    }
  }
  form.updateFieldAppearances();
  form.flatten();
  const pdfFinal = await pdfDoc.save();
  return Buffer.from(pdfFinal);
}
