import { extraerDatosINE } from "../utils/extraer_datos.utils";
import { validarCURP } from "../utils/validar_curp.utils";
import { IneValida } from "../types/ine.types";
//import { GoogleGenAI, genAI } from '@google/genai';
//const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }).models;
async function escanearINE(fuente: Buffer): Promise<IneValida> {
  console.log("🔍 Enviando a Gemini...");
  const datos = await extraerDatosINE(fuente);

  console.log("✅ Validando CURP...");
  const curpValidada = await validarCURP(datos.curp);

  return { ...datos, curpValidada };
}
export { escanearINE };
