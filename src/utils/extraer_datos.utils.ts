//import fs from "fs";
import { GoogleGenAI } from "@google/genai";

//Esta función recibe la ruta o URL de una imagen de una credencial INE mexicana, la analiza usando el modelo Gemini-3-Flash-Preview de Google GenAI, y devuelve un JSON con los datos extraídos siguiendo una estructura específica.

//This functions receives an image or path of a mexican INE dcredential and extract the data using the gemini-3-flash-preview model of Google GenAI and returns  a JSON with the extracted data following a specific structure.
async function extraerDatosINE(fuente: Buffer) {
  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  let imagePart;
  imagePart = {
    inlineData: {
      data: fuente.toString("base64"),
      mimeType: "image/jpeg",
    },
  };
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

  const raw = response.text
    ? response.text.replace(/```json|```/g, "").trim()
    : "";
  const data = JSON.parse(raw);
  data.nombreCompleto = `${data.nombre} ${data.apellidoPaterno} ${data.apellidoMaterno}`;
  return data;
}
export { extraerDatosINE };
