// src/utils/tablas_descuento.utils.ts
import * as XLSX from "xlsx";
import path from "path";
import { FilaTabla } from "../types";
// Guardamos todas las tablas en memoria
const tablas: Record<number, FilaTabla[]> = {};

function cargarTablas() {
  const rutaExcel = path.join(__dirname, "../táblas/tablas_descuento.xlsx");
  const workbook = XLSX.readFile(rutaExcel);

  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json<any>(sheet, { range: 9, defval: 0 }); //El range nueve se usa para decir donde esta la primera columna donde estan los headers del pdf
    const catRaw = sheet["E6"]?.v;
    const filas = rows
      .filter((row) => row[" Monto Neto a Prestar "] > 0)
      .map((row) => ({
        montoNeto: row[" Monto Neto a Prestar "],
        montoPagare: row[" Monto   Pagaré "], // ← ojo, tiene 3 espacios
        descuentoQuincenal: parseFloat(
          row[" Importe de Descuento "].toFixed(2),
        ),
        plazoMeses: row[" Plazo Mensual "],
        plazoQuincenas: row[" Plazo Knal "],
        tasaMensual: Math.round(row[" Tasa de intrés mensual "] * 100),
        importeInteres: row[" Importe de Intrés "],
        cat: catRaw * 100,
      }));
    const quincenas = filas[0]?.plazoQuincenas;
    if (quincenas) tablas[quincenas] = filas;
  });
}

function consultarTabla(monto: number, quincenas: number): FilaTabla | null {
  const tabla = tablas[quincenas];
  if (!tabla) return null;

  return tabla.find((row) => row.montoNeto === monto) ?? null;
}
export { cargarTablas, consultarTabla };
