import { fechaConLetra } from "../types/fecha.types";
export const numQuincena = async (
  fechaArranque: fechaConLetra,
): Promise<string> => {
  if (fechaArranque.dia === "15")
    return (
      (parseInt(fechaArranque.mes, 10) * 2 - 1).toString() +
      `/${fechaArranque.año}`
    );
  else if (fechaArranque.dia === "30")
    return (
      (parseInt(fechaArranque.mes, 10) * 2).toString() + `/${fechaArranque.año}`
    );
  else return "0";
};
