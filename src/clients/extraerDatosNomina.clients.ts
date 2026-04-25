import { GoogleGenAI } from "@google/genai";
async function extraerDatosNomina(fuente1: Buffer, fuente2: Buffer) {
  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const toBase64 = (buf: Buffer) => ({
    inlineData: {
      data: buf.toString("base64"),
      mimeType: "image/jpeg",
    },
  });

  const response = await genAI.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          {
            text: `Analiza estos DOS comprobantes de pago (nóminas quincenales) del gobierno mexicano.
              Devuelve ÚNICAMENTE un JSON válido con exactamente esta estructura, sin texto adicional, sin markdown, sin bloques de código:
              {
                "noEmpleado": "número de empleado (tómalo de cualquiera de las dos, es el mismo)",
                "rfc": "RFC del empleado en mayúsculas (es el mismo en ambas)",
                "puesto": "categoría o puesto en mayúsculas (es el mismo en ambas)",
                "departamento": "nombre del grupo nominal en mayúsculas",
                "dependencia": "si el encabezado dice GOBIERNO DEL ESTADO DE SINALOA devuelve exactamente GOBIERNO DEL ESTADO DE SINALOA, si dice MAGISTERIO o SEP o educación devuelve exactamente MAGISTERIO DE SINALOA, si no reconoces ninguna devuelve cadena vacía",
                "percepcionNomina1": número con el total de PERCEPCIONES de la primera nómina (solo el número sin signos ni comas),
                "percepcionNomina2": número con el total de PERCEPCIONES de la segunda nómina (solo el número sin signos ni comas),
                "ingresoMensual": número resultado de sumar ambas PERCEPCIONES (nomina1 + nomina2) porque juntas representan el mes completo (solo el número)
              }`,
          },
          toBase64(fuente1),
          toBase64(fuente2),
        ],
      },
    ],
  });

  const raw = response.text
    ? response.text.replace(/```json|```/g, "").trim()
    : "";
  console.log("Respuesta cruda de Gemini:", JSON.parse(raw));
  return JSON.parse(raw);
}

export { extraerDatosNomina };
