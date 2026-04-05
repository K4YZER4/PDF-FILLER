import { consultarTabla } from "../utils/tabla_cargar.utils";
import { FilaTabla } from "../types";
export const filtraTablaServices = async (
  monto: number,
  quincenas: number,
): Promise<FilaTabla | null> => consultarTabla(monto, quincenas) ?? null;
