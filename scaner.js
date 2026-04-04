const imagen = "./ine.jpeg"; // ← Cambia esta URL o pon ruta local: './ine.png'

// ─────────────────────────────────────────────
const Tesseract = require("tesseract.js");
const sharp = require("sharp");
const fs = require("fs");

async function preprocesarImagen(fuente) {
  const rutaSalida = "./ine_temp_procesada.png";
  let inputBuffer;

  if (fuente.startsWith("http")) {
    const res = await fetch(fuente);
    inputBuffer = Buffer.from(await res.arrayBuffer());
  } else {
    inputBuffer = fs.readFileSync(fuente);
  }

  await sharp(inputBuffer)
    .resize({ width: 2000 })
    .greyscale()
    .normalize()
    .sharpen({ sigma: 1.5 })
    .linear(1.4, -(1.4 * 128) + 128)
    .toFile(rutaSalida);

  return rutaSalida;
}

async function extraerTexto(rutaImagen) {
  const {
    data: { text, confidence },
  } = await Tesseract.recognize(rutaImagen, "spa", {
    logger: (m) =>
      process.stdout.write(`\r🔍 ${m.status} ${Math.round(m.progress * 100)}%`),
  });
  console.log(`\n📊 Confianza del OCR: ${confidence.toFixed(1)}%`);
  return text;
}

function parsearINE(texto) {
  const t = texto.toUpperCase();

  const curp = t.match(/[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d/)?.[0] ?? "";
  const claveElector = t.match(/\b([A-Z]{6}\d{8}[HM]\d{3})\b/)?.[1] ?? "";
  const fechaNac = t.match(/\b(\d{2}\/\d{2}\/\d{4})\b/)?.[1] ?? "";
  const vigencia = t.match(/VIG[ENCIA]*[\s.:]+(\d{4})/)?.[1] ?? "";
  const seccion = t.match(/SECCI[ÓO]N[\s:]+(\d{4,6})/)?.[1] ?? "";
  const numEmision = t.match(/EMISI[ÓO]N[\s:]+(\d{2})/)?.[1] ?? "";
  const bloqueNombre = t.match(
    /NOMBRE\s*[\n\r]+([A-ZÁÉÍÓÚÑ\s]+)[\n\r]+([A-ZÁÉÍÓÚÑ\s]+)/,
  );
  const nombre = bloqueNombre?.[1]?.trim() ?? "";
  const apellidos = bloqueNombre?.[2]?.trim() ?? "";
  const estado =
    t.match(
      /AGUASCALIENTES|BAJA CALIFORNIA|CAMPECHE|CHIAPAS|CHIHUAHUA|COAHUILA|COLIMA|DURANGO|GUANAJUATO|GUERRERO|HIDALGO|JALISCO|MICHOACAN|MORELOS|NAYARIT|NUEVO LEON|OAXACA|PUEBLA|QUERETARO|QUINTANA ROO|SAN LUIS POTOSI|SINALOA|SONORA|TABASCO|TAMAULIPAS|TLAXCALA|VERACRUZ|YUCATAN|ZACATECAS|CIUDAD DE MEXICO/,
    )?.[0] ?? "";

  return {
    nombre,
    apellidos,
    fechaNac,
    curp,
    claveElector,
    vigencia,
    seccion,
    numEmision,
    estado,
  };
}

async function validarCURP(curp) {
  if (!curp || curp.length !== 18)
    return { valido: false, mensaje: "CURP inválida" };
  try {
    const res = await fetch(
      `https://consultas.curp.gob.mx/CurpSP/gobmx/anterior.do?curp=${curp}`,
    );
    const texto = await res.text();
    const existe = !texto.includes("no encontrada") && !texto.includes("ERROR");
    return {
      valido: existe,
      mensaje: existe ? "CURP verificada ✅" : "CURP no encontrada ❌",
    };
  } catch {
    return { valido: null, mensaje: "No se pudo verificar (sin conexión)" };
  }
}

async function escanearINE(fuente) {
  console.log("📷 Procesando imagen...");
  const imagenMejorada = await preprocesarImagen(fuente);

  console.log("🔤 Extrayendo texto...");
  const texto = await extraerTexto(imagenMejorada);

  console.log("🧹 Parseando campos...");
  const datos = parsearINE(texto);

  console.log("✅ Validando CURP...");
  const curpValidada = await validarCURP(datos.curp);

  fs.unlinkSync(imagenMejorada);

  return { ...datos, curpValidada };
}

// ─── EJECUTAR ───────────────────────────────
escanearINE(imagen).then((resultado) => {
  console.log("\n📋 DATOS EXTRAÍDOS DEL INE:");
  console.log(JSON.stringify(resultado, null, 2));
});
