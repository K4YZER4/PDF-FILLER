import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";

async function listarCampos() {
  const pdfBytes = fs.readFileSync(path.join(__dirname, "../contrato.pdf"));
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();
  const fields = form.getFields();

  console.log(`\n📋 Total de campos: ${fields.length}\n`);

  fields.forEach((field) => {
    const type = field.constructor.name; // PDFTextField, PDFCheckBox, etc.
    console.log(`${type.padEnd(20)} → "${field.getName()}"`);
  });
}

listarCampos();
