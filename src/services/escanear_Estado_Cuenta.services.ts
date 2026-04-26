import { extraerDatosEstadoCuenta } from "../clients/extraerDatosEstadoCuenta.clients";
import { EstadoCuentaDatos } from "../types";
export async function extraerDatosEstadoCuentaServices(
  fuente: Buffer,
): Promise<EstadoCuentaDatos> {
  return await extraerDatosEstadoCuenta(fuente);
}
