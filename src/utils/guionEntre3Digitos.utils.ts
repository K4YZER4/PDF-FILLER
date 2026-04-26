export function formatearCadaTresCaracteres(cadena: string): string {
  if (!cadena) return "";
  if (cadena.length <= 3) return cadena;
  if (cadena.length === 4) return cadena;
  let partes: string[] = [];
  let i = 0;
  while (cadena.length - i > 4) {
    partes.push(cadena.substr(i, 3));
    i += 3;
  }
  partes.push(cadena.substr(i));
  return partes.join("-");
}
