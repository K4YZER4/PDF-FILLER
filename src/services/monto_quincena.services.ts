import { FilaTabla } from "../types/tabla.types";
import { consultarTabla } from "../utils/tabla_cargar.utils";

export const filtraTablaServices = async (
  monto: number,
  quincenas: number,
): Promise<FilaTabla | null> => consultarTabla(monto, quincenas) ?? null;
