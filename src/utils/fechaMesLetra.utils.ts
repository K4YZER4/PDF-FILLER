import { fechaConLetra } from "../types/fecha.types";
const MONTHS = [
  "ENERO",
  "FEBRERO",
  "MARZO",
  "ABRIL",
  "MAYO",
  "JUNIO",
  "JULIO",
  "AGOSTO",
  "SEPTIEMBRE",
  "OCTUBRE",
  "NOVIEMBRE",
  "DICIEMBRE",
];
const fechaMesConLetra = (fecha: string): fechaConLetra => {
  let fechaResultante = {
    dia: "",
    mes: "",
    año: "",
    mesLetra: "",
  };
  if (fecha.includes("-")) {
    const partes = fecha.split("-");
    fechaResultante.dia = partes[2]; // "09"
    fechaResultante.mes = partes[1]; // "04" → se convierte abajo
    fechaResultante.año = partes[0]; // "2026"
  }
  // Formato DD/MM/YYYY (por si acaso)
  else if (fecha.includes("/")) {
    const partes = fecha.split("/");
    fechaResultante.dia = partes[0];
    fechaResultante.mes = partes[1];
    fechaResultante.año = partes[2];
  }
  const mesNum = parseInt(fechaResultante.mes, 10);
  const mesLetra =
    !isNaN(mesNum) && mesNum >= 1 && mesNum <= 12
      ? MONTHS[mesNum - 1]
      : fechaResultante.mes.toUpperCase();
  fechaResultante.mesLetra = mesLetra;
  return fechaResultante;
};
export { fechaMesConLetra };
