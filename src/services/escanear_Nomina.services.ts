import { extraerDatosNomina } from "../clients/extraerDatosNomina.clients";
export async function escanearNominaServices(nomina1: Buffer, nomina2: Buffer) {
  console.log("🔍 Enviando nóminas a Gemini...");
  return await extraerDatosNomina(nomina1, nomina2);
}
