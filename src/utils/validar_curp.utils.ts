async function validarCURP(curp: string) {
  if (!curp || curp.length !== 18)
    return { valido: false, mensaje: "CURP inválida" };
  try {
    const res = await fetch(
      `https://consultas.curp.gob.mx/CurpSP/gobmx/anterior.do?curp=${curp}`,
    );
    const body = await res.text();
    const ok = !body.includes("no encontrada") && !body.includes("ERROR");
    return {
      valido: ok,
      mensaje: ok ? "CURP verificada ✅" : "CURP no encontrada ❌",
    };
  } catch {
    return { valido: null, mensaje: "Sin conexión al RENAPO" };
  }
}
export { validarCURP };
