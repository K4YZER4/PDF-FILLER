require("dotenv").config();

const imagen = "./ine.jpeg"; // ← Cambia aquí tu ruta

// ─────────────────────────────────────────────────────────────
const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// ── 1. Extracción directa con Gemini (JSON estructurado) ─────
async function extraerDatosINE(fuente) {
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
            text: `Analiza esta credencial INE mexicana y devuelve ÚNICAMENTE un JSON válido con exactamente esta estructura, sin texto adicional, sin markdown, sin bloques de código:
{
  "nombre": "nombre(s) de pila",
  "apellidoPaterno": "primer apellido",
  "apellidoMaterno": "segundo apellido",
  "sexo": "H o M",
  "fechaNac": "DD/MM/YYYY",
  "curp": "18 caracteres",
  "claveElector": "18 caracteres",
  "domicilio": {
    "calle": "solo nombre de la calle sin número",
    "numeroCasa": "solo el número exterior",
    "colonia": "nombre de colonia o fraccionamiento sin la palabra FRACC o COL",
    "codigoPostal": "5 dígitos",
    "municipio": "nombre del municipio o delegación",
    "estado": "nombre del estado"
  },
  "seccion": "número de sección electoral",
  "vigencia": "año inicio - año fin o solo año fin",
  "numEmision": "número de emisión si existe"
}`,
          },
          imagePart,
        ],
      },
    ],
  });

  const raw = response.text.replace(/```json|```/g, "").trim();
  return JSON.parse(raw);
}

// ── 2. Validar CURP contra RENAPO (gratis) ───────────────────
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
  const datos = await extraerDatosINE(fuente);

  console.log("✅ Validando CURP...");
  const curpValidada = await validarCURP(datos.curp);

  return { ...datos, curpValidada };
}

escanearINE(imagen)
  .then((r) => {
    console.log("\n📋 DATOS EXTRAÍDOS DEL INE:");
    console.log(JSON.stringify(r, null, 2));
  })
  .catch(console.error);
