// src/utils/numero_letras.utils.ts

const UNIDADES = [
  "",
  "UNO",
  "DOS",
  "TRES",
  "CUATRO",
  "CINCO",
  "SEIS",
  "SIETE",
  "OCHO",
  "NUEVE",
  "DIEZ",
  "ONCE",
  "DOCE",
  "TRECE",
  "CATORCE",
  "QUINCE",
  "DIECISÉIS",
  "DIECISIETE",
  "DIECIOCHO",
  "DIECINUEVE",
];
const DECENAS = [
  "",
  "DIEZ",
  "VEINTE",
  "TREINTA",
  "CUARENTA",
  "CINCUENTA",
  "SESENTA",
  "SETENTA",
  "OCHENTA",
  "NOVENTA",
];
const CENTENAS = [
  "",
  "CIENTO",
  "DOSCIENTOS",
  "TRESCIENTOS",
  "CUATROCIENTOS",
  "QUINIENTOS",
  "SEISCIENTOS",
  "SETECIENTOS",
  "OCHOCIENTOS",
  "NOVECIENTOS",
];

function convertirCentenas(n: number): string {
  if (n === 100) return "CIEN";
  if (n < 20) return UNIDADES[n];
  if (n < 100) {
    const u = n % 10;
    return u === 0
      ? DECENAS[Math.floor(n / 10)]
      : `${DECENAS[Math.floor(n / 10)]} Y ${UNIDADES[u]}`;
  }
  const resto = n % 100;
  return resto === 0
    ? CENTENAS[Math.floor(n / 100)]
    : `${CENTENAS[Math.floor(n / 100)]} ${convertirCentenas(resto)}`;
}

function convertirMiles(n: number): string {
  if (n === 0) return "";
  if (n < 1000) return convertirCentenas(n);
  const miles = Math.floor(n / 1000);
  const resto = n % 1000;
  const prefijo = miles === 1 ? "MIL" : `${convertirCentenas(miles)} MIL`;
  return resto === 0 ? prefijo : `${prefijo} ${convertirCentenas(resto)}`;
}

function numeroALetrasPesos(num: number): string {
  const [enteroStr, decStr] = num.toFixed(2).split(".");
  const entero = parseInt(enteroStr);
  const centavos = decStr.padEnd(2, "0");

  if (entero === 0) return `CERO PESOS ${centavos}/100 M.N.`;

  const millones = Math.floor(entero / 1_000_000);
  const resto = entero % 1_000_000;

  let resultado = "";
  if (millones === 1) resultado += "UN MILLÓN ";
  else if (millones > 1)
    resultado += `${convertirCentenas(millones)} MILLONES `;
  resultado += convertirMiles(resto);

  return `${resultado.trim()} PESOS ${centavos}/100 M.N.`;
}
function numeroALetras(num: number): string {
  const entero = Math.floor(num);
  if (entero === 0) return "CERO";

  let resultado = "";
  resultado += convertirMiles(entero);

  return resultado.trim();
}
export { numeroALetrasPesos, numeroALetras };
