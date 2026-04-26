import { GoogleGenAI } from "@google/genai";
import { EstadoCuentaDatos } from "../types";
async function extraerDatosEstadoCuenta(
  fuente: Buffer,
): Promise<EstadoCuentaDatos> {
  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const response = await genAI.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          {
            text: `Eres un extractor de datos de estados de cuenta bancarios mexicanos.
              Analiza esta imagen y devuelve ÚNICAMENTE un JSON válido con exactamente esta estructura, sin texto adicional, sin markdown, sin bloques de código:
              {
                "nombreTitular": "nombre completo del titular en mayúsculas",
                "rfc": "RFC del titular en mayúsculas",
                "banco": "nombre del banco en mayúsculas, ejemplo: BANORTE, BBVA, SANTANDER, HSBC",
                "numeroCuenta": "número de cuenta sin espacios",
                "clabe": "CLABE interbancaria de 18 dígitos sin espacios",
                "periodoInicio": "DD/MM/YYYY de inicio del periodo",
                "periodoFin": "DD/MM/YYYY de fin del periodo",
                "saldoAlCorte": numero del saldo al corte sin signos ni comas,
                "saldoPromedio": numero del saldo promedio del periodo sin signos ni comas,
                "totalDepositos": numero del total de depósitos del periodo sin signos ni comas
              }`,
          },
          {
            inlineData: {
              data: fuente.toString("base64"),
              mimeType: "image/jpeg",
            },
          },
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

export { extraerDatosEstadoCuenta };
