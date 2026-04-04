require("dotenv").config();

const imagen = "./ine.jpeg"; // ← Cambia aquí tu ruta

// ─────────────────────────────────────────────────────────────
const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ── 1. OCR con Gemini ────────────────────────────────────────
async function extraerTexto(fuente) {
  let imagePart;

  if (fuente.startsWith("http")) {
    const res = await fetch(fuente);
    const buffer = Buffer.from(await res.arrayBuffer());
    imagePart = {
      inlineData: { data: buffer.toString("base64"), mimeType: "image/jpeg" },
    };
  } else {
    imagePart = {
      inlineData: {
        data: fs.readFileSync(fuente).toString("base64"),
        mimeType: "image/jpeg",
      },
    };
  }

  const response = await genAI.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          {
            text: `Extrae TODO el texto visible en esta credencial INE mexicana exactamente como aparece, respetando saltos de línea. No interpretes ni resumas.`,
          },
          imagePart,
        ],
      },
    ],
  });

  return response.text;
}

// ── 2. Parser para todas las generaciones del INE ────────────
function parsearINE(texto) {
  const t = texto.toUpperCase();
  const lineas = t
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  // CURP y clave de elector (igual que antes)
  const curp =
    t.match(/\b([A-Z]{4}\d{6}[HM][A-Z]{2}[A-Z]{3}[A-Z0-9]\d)\b/)?.[1] ?? "";
  const claveElector = t.match(/\b([A-Z]{6}\d{8}[HM]\d{3})\b/)?.[1] ?? "";

  // Fecha — acepta DD/MM/YYYY directo
  const fechaNac =
    t.match(/\b(\d{2}\/\d{2}\/\d{4})\b/)?.[1] ??
    t.match(/\b(\d{2}[- ]\d{2}[- ]\d{4})\b/)?.[1] ??
    t.match(
      /\b(\d{2}\s+(?:ENE|FEB|MAR|ABR|MAY|JUN|JUL|AGO|SEP|OCT|NOV|DIC)\s+\d{4})\b/,
    )?.[1] ??
    "";

  // Vigencia — formato "2024 - 2034" o "2024-2034" o "VIGENCIA 2034"
  const vigencia =
    t.match(/VIG(?:ENCIA)?[:\s.]+(\d{4})/)?.[1] ??
    t
      .match(/(\d{4})\s*[-–]\s*(\d{4})/)
      ?.slice(1)
      .join(" - ") ??
    "";

  // Sección electoral
  const seccion =
    t.match(/SECCI[OÓ]N[:\s]+(\d{3,6})/)?.[1] ??
    t.match(/\b(\d{4})\b(?=.*(?:SECCI|VIG|\d{4}))/)?.[1] ??
    "";

  // Número de emisión
  const numEmision = t.match(/(?:EMISI[OÓ]N|NÚM\.?)[:\s]+(\d{2})/)?.[1] ?? "";

  // Sexo — busca H o M cerca de la fecha o en campo SEXO
  const sexo =
    t.match(/SEXO[:\s]+([HM])\b/)?.[1] ??
    (curp[10] === "H" ? "H" : curp[10] === "M" ? "M" : "");

  // ── Nombre y apellidos ───────────────────────────────────────
  // INE: APELLIDO PATERNO / APELLIDO MATERNO / NOMBRE(S)
  let apellidoPaterno = "",
    apellidoMaterno = "",
    nombre = "";
  const idxNombre = lineas.findIndex((l) => l.includes("NOMBRE"));
  if (idxNombre !== -1) {
    apellidoPaterno =
      lineas[idxNombre + 1]?.replace(/[^A-ZÁÉÍÓÚÑ\s]/g, "").trim() ?? "";
    apellidoMaterno =
      lineas[idxNombre + 2]?.replace(/[^A-ZÁÉÍÓÚÑ\s]/g, "").trim() ?? "";
    nombre = lineas[idxNombre + 3]?.replace(/[^A-ZÁÉÍÓÚÑ\s]/g, "").trim() ?? "";
  }

  // ── Domicilio ────────────────────────────────────────────────
  // Calle + número: busca "C NOMBRE 254" o "CALLE NOMBRE 254"
  const regexCalle = /(?:^C\s+|CALLE\s+)([A-ZÁÉÍÓÚÑ\s]+?)\s+(\d+)/m;
  const matchCalle = t.match(regexCalle);
  const calle = matchCalle?.[1]?.trim() ?? "";
  const numeroCasa = matchCalle?.[2] ?? "";

  // Colonia / Fraccionamiento
  const colonia =
    t
      .match(
        /(?:FRACC?\.?\s+|COL\.?\s+|COLONIA\s+|FRACCIONAMIENTO\s+)([A-ZÁÉÍÓÚÑ\s]+?)(?:\n|\d{5})/,
      )?.[1]
      ?.trim() ?? "";

  // Código postal — 5 dígitos
  const codigoPostal = t.match(/\b(\d{5})\b/)?.[1] ?? "";

  // Municipio y estado — busca "MUNICIPIO, ESTADO" o líneas separadas
  const regexMunEst =
    /([A-ZÁÉÍÓÚÑ]+)[,\s]+(?:SIN|SON|JAL|CHIH|NL|BC|BCS|TAB|VER|OAX|GRO|PUE|MEX|CDMX|AGS|CAMP|CHIS|COAH|COL|DGO|GTO|HGO|MIC|MOR|NAY|QRO|QROO|SLP|TLAX|YUC|ZAC)/;
  const matchMunEst = t.match(regexMunEst);
  const municipio = matchMunEst?.[1]?.trim() ?? "";

  const estado =
    t.match(
      /\b(AGUASCALIENTES|BAJA CALIFORNIA SUR|BAJA CALIFORNIA|CAMPECHE|CHIAPAS|CHIHUAHUA|COAHUILA|COLIMA|DURANGO|GUANAJUATO|GUERRERO|HIDALGO|JALISCO|MEXICO|MICHOACAN|MORELOS|NAYARIT|NUEVO LEON|OAXACA|PUEBLA|QUERETARO|QUINTANA ROO|SAN LUIS POTOSI|SINALOA|SONORA|TABASCO|TAMAULIPAS|TLAXCALA|VERACRUZ|YUCATAN|ZACATECAS|CIUDAD DE MEXICO)\b/,
    )?.[1] ?? "";

  const mrz = lineas.filter(
    (l) => l.startsWith("IDMEX") || /^[A-Z0-9<]{30,}$/.test(l),
  );

  return {
    nombre,
    apellidoPaterno,
    apellidoMaterno,
    sexo,
    fechaNac,
    curp,
    claveElector,
    domicilio: { calle, numeroCasa, colonia, codigoPostal, municipio, estado },
    vigencia,
    seccion,
    numEmision,
    mrz: mrz.length ? mrz : undefined,
  };
}
// ── 3. Validar CURP contra RENAPO (gratis) ───────────────────
async function validarCURP(curp) {
  if (!curp || curp.length !== 18)
    return { valido: false, mensaje: "CURP inválida" };
  try {
    const res = await fetch(
      `https://consultas.curp.gob.mx/CurpSP/gobmx/anterior.do?curp=${curp}`,
    );
    const body = await res.text();
    const ok = !body.includes("no encontrada") && !body.includes("ERROR");
    return {
      valido: ok,
      mensaje: ok ? "CURP verificada ✅" : "CURP no encontrada ❌",
    };
  } catch {
    return { valido: null, mensaje: "Sin conexión al RENAPO" };
  }
}

// ── MAIN ─────────────────────────────────────────────────────
async function escanearINE(fuente) {
  console.log("🔍 Enviando a Gemini...");
  const texto = await extraerTexto(fuente);

  console.log("\n📄 TEXTO RAW:\n", texto);

  const datos = parsearINE(texto);
  const curpValidada = await validarCURP(datos.curp);

  return { ...datos, curpValidada };
}

escanearINE(imagen)
  .then((r) => {
    console.log("\n📋 DATOS EXTRAÍDOS DEL INE:");
    console.log(JSON.stringify(r, null, 2));
  })
  .catch(console.error);
