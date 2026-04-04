// rellenarContrato.js
// Uso: import { rellenarContrato } from './rellenarContrato.js'
//
// Requiere: npm install pdf-lib
//
// Función principal:
//   rellenarContrato(datosINE, pdfPath, outputPath?)
//   - datosINE    : JSON con datos del escáner (scaner2.js)
//   - pdfPath     : Ruta al PDF original (con los campos vacíos)
//   - outputPath  : (opcional) Si se pasa, guarda el archivo; si no, retorna el Buffer

import { PDFDocument } from "pdf-lib";
import fs from "fs";
import path from "path";

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

/**
 * Intenta escribir en un TextField. Si el campo no existe o no es texto,
 * solo imprime una advertencia y continúa (no rompe el proceso).
 */
function setField(form, nombre, valor) {
  if (!valor) return; // No escribir si el valor está vacío
  try {
    form.getTextField(nombre).setText(String(valor));
  } catch {
    console.warn(
      `⚠️  Campo omitido: "${nombre}" (no existe o no es TextField)`,
    );
  }
}

/**
 * Parsea "DD/MM/YYYY" y retorna { dia, mes, anio }
 */
function parsearFecha(fechaStr = "") {
  const partes = fechaStr.split("/");
  return {
    dia: partes[0] || "",
    mes: partes[1] || "",
    anio: partes[2] || "",
  };
}

// ──────────────────────────────────────────────
// Mapeo: campos del PDF → valores del JSON
// ──────────────────────────────────────────────
// IMPORTANTE: Los nombres de los campos aquí deben coincidir
// EXACTAMENTE con los que aparecen en el PDF (los que viste en PDF24).
// Si alguno no coincide, el script mostrará una advertencia ⚠️ y seguirá.

function construirMapeo(datos) {
  const { dia, mes, anio } = parsearFecha(datos.fechaNac);
  const dom = datos.domicilio || {};

  return {
    // ── Nombre completo
    "APELLIDO 1": datos.apellidoPaterno || "",
    "APELLIDO 2": datos.apellidoMaterno || "",
    "NOMBRE 1": datos.nombre || "",

    // ── Identificación
    CURP: datos.curp || "",

    // ── Fecha de nacimiento (campos separados)
    NDIA: dia,
    NMES: mes,
    NAÑO: anio,

    // ── Domicilio
    CALLE: dom.calle || "",
    "NO EXT": dom.numeroCasa || "",
    COLONIA: dom.colonia || "",
    MUNICIPIO: dom.municipio || "",
    ESTADO: dom.estado || "",

    // ── Código postal (si el PDF tiene ese campo)
    CP: dom.codigoPostal || "",
  };
}

// ──────────────────────────────────────────────
// Función principal exportada
// ──────────────────────────────────────────────

/**
 * Rellena los campos del contrato PDF con los datos del INE.
 *
 * @param {Object} datosINE    - JSON proveniente de scaner2.js
 * @param {string} pdfPath     - Ruta al PDF con los campos vacíos
 * @param {string} [outputPath] - (opcional) Ruta donde guardar el PDF relleno
 * @returns {Promise<Buffer>}  - Buffer del PDF relleno (y lo guarda si se pasó outputPath)
 *
 * @example
 * // Solo retornar el buffer (para enviarlo por API, etc.)
 * const pdfBuffer = await rellenarContrato(datosINE, './contrato.pdf');
 * res.set('Content-Type', 'application/pdf');
 * res.send(pdfBuffer);
 *
 * @example
 * // Guardar directamente en disco
 * await rellenarContrato(datosINE, './contrato.pdf', './contrato_relleno.pdf');
 */
export async function rellenarContrato(datosINE, pdfPath, outputPath = null) {
  // 1. Cargar el PDF original
  const pdfBytes = fs.readFileSync(path.resolve(pdfPath));
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();

  // 2. Construir el mapeo y rellenar campos
  const mapeo = construirMapeo(datosINE);

  console.log("🖊️  Rellenando contrato con los siguientes datos:");
  for (const [campo, valor] of Object.entries(mapeo)) {
    if (valor) {
      console.log(`   ${campo.padEnd(14)} → ${valor}`);
      setField(form, campo, valor);
    }
  }

  // 3. (Opcional) Aplanar el formulario para que no sea editable
  // form.flatten(); // ← Descomenta si quieres que los campos queden "fijos"

  // 4. Serializar el PDF relleno
  const filledBytes = await pdfDoc.save();
  const buffer = Buffer.from(filledBytes);

  // 5. Guardar en disco si se pasó outputPath
  if (outputPath) {
    fs.writeFileSync(path.resolve(outputPath), buffer);
    console.log(`✅  PDF guardado en: ${outputPath}`);
  }

  return buffer;
}

// ──────────────────────────────────────────────
// Utilidad extra: listar todos los campos del PDF
// ──────────────────────────────────────────────

/**
 * Imprime en consola todos los campos del PDF con su tipo y nombre.
 * Útil para verificar que los nombres del mapeo coinciden.
 *
 * @param {string} pdfPath - Ruta al PDF
 * @example
 * import { listarCampos } from './rellenarContrato.js';
 * await listarCampos('./contrato.pdf');
 */
export async function listarCampos(pdfPath) {
  const pdfBytes = fs.readFileSync(path.resolve(pdfPath));
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const form = pdfDoc.getForm();
  const fields = form.getFields();

  console.log(`\n📋 Campos encontrados en el PDF (${fields.length} total):\n`);
  fields.forEach((field) => {
    const tipo = field.constructor.name.replace("PDF", "");
    const nombre = field.getName();
    console.log(`  [${tipo.padEnd(12)}] "${nombre}"`);
  });
}
