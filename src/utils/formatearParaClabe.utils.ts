export function formatearClabe(cadena: string): string {
  if (!cadena) return "";

  // Remover guiones si ya existen
  const limpiar = cadena.replace(/-/g, "");

  // Si tiene menos de 18 dígitos, retornar como está
  if (limpiar.length < 18) return limpiar;

  // Formatear con patrón 3-3-4-4-4
  const parte1 = limpiar.substr(0, 3);
  const parte2 = limpiar.substr(3, 3);
  const parte3 = limpiar.substr(6, 4);
  const parte4 = limpiar.substr(10, 4);
  const parte5 = limpiar.substr(14, 4);

  return `${parte1}-${parte2}-${parte3}-${parte4}-${parte5}`;
}
