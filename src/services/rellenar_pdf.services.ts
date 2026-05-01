import {
  rellenarCamposPDF,
  fechaMesConLetra,
  numeroALetras,
  numeroALetrasPesos,
  numQuincena,
  formatearCadaTresCaracteres,
  formatearClabe,
} from "../utils/index";
import { ContratoData } from "../types";
function formatearConComas(num: number | string): string {
  return Number(num).toLocaleString("en-US");
}
export async function generarContrato(contrato: ContratoData): Promise<Buffer> {
  const { ine, tabla, extra, estadoCuenta, nomina } = contrato;

  // ── Separar centavos ──────────────────────────
  let [montoEnt, montoCent] = tabla.montoNeto.toFixed(2).split(".");
  let [pagareEnt, pagareCent] = tabla.montoPagare.toFixed(2).split(".");
  let [descEnt, descCent] = tabla.descuentoQuincenal.toFixed(2).split(".");
  let [ingresoEnt, ingresoCent] = (nomina.ingresoMensual ?? 0)
    .toFixed(2)
    .split(".");
  ingresoEnt = formatearConComas(ingresoEnt);
  descEnt = formatearConComas(descEnt);
  montoEnt = formatearConComas(montoEnt);
  pagareEnt = formatearConComas(pagareEnt);
  // ── Fecha del contrato ────────────────────────
  // ── Fecha del contrato ────────────────────────
  const fechacontrato = fechaMesConLetra(extra.fechaContrato ?? "");
  const fechaArranque = fechaMesConLetra(extra.fechaArranque ?? "");
  // Agregar arriba, antes de la función
  const numQuincenaResult = await numQuincena(fechaArranque);
  const camposPDF: Record<string, string> = {
    // ── INE ──────────────────────────────────────
    "NOMBRE 1": ine.nombre1.toUpperCase(),
    "NOMBRE 2": ine.nombre2.toUpperCase(),
    "APELLIDO 1": ine.apellidoPaterno.toUpperCase(),
    "APELLIDO 2": ine.apellidoMaterno.toUpperCase(),
    CURP: ine.curp,
    NDIA: ine.fechaNac.split("-")[2],
    NMES: ine.fechaNac.split("-")[1],
    NAÑO: ine.fechaNac.split("-")[0],
    CALLE: ine.domicilio.calle,
    "NO EXT": ine.domicilio.numeroCasa,
    COLONIA: ine.domicilio.colonia,
    "CODIGO POSTAL": ine.domicilio.codigoPostal,
    MUNICIPIO: ine.domicilio.municipio,
    ESTADO: ine.domicilio.estado,
    CIUDAD: ine.domicilio.municipio,
    PAISNAC: "MEXICO",
    NACIONALIDAD: "MEXICANA",
    PAIS: "MEXICO",
    "NOMBRE COMPLETO":
      `${ine.nombre1.toUpperCase()} ${ine.nombre2.toUpperCase()} ${ine.apellidoPaterno.toUpperCase()} ${ine.apellidoMaterno.toUpperCase()}`.trim(),
    "Casilla de verificación1": ine.sexo === "F" ? "Yes" : "No",
    "Casilla de verificación2": ine.sexo === "M" ? "Yes" : "No",
    // ── Tabla ─────────────────────────────────────
    "MONTO CAPITAL": `$${montoEnt}.${montoCent}`,
    //CENT1: montoCent,
    "MONTO TOTAL": `$${pagareEnt}.${pagareCent}`,
    CENT2: pagareCent,
    DESCUENTO: "$" + descEnt + "." + descCent,
    CENT3: descCent,
    "TASA ANUAL": String((tabla.tasaMensual * 12).toFixed(2)),
    CAT: String(tabla.cat.toFixed(2)),
    PLAZO1: `${tabla.plazoQuincenas}`,
    "PLAZO LETRA": numeroALetras(tabla.plazoQuincenas),
    "MONTO TOTAL LETRA": `(${
      numeroALetrasPesos(tabla.montoPagare).split(" PESOS")[0]
    })`, // Solo la parte en letras, sin "PESOS"
    "DESCUENTO LETRA": `(${numeroALetrasPesos(tabla.descuentoQuincenal).split(" PESOS")[0]})`, // Solo la parte en letras, sin "PESOS"

    // ── Fecha contrato ────────────────────────────
    DIA: fechacontrato.dia,
    MES: fechacontrato.mesLetra,
    AÑO: fechacontrato.año,
    // "INICIO QNA": extra.inicioQna ?? "",

    // ── Extra ─────────────────────────────────────
    "Casilla de verificación3": extra.propiedad === "propia" ? "Yes" : "No",
    "Casilla de verificación4": extra.propiedad === "rentada" ? "Yes" : "No",
    "Casilla de verificación5": extra.propiedad === "familiar" ? "Yes" : "No",
    SUKURSAL: extra.sucursal ?? "SINALOA",
    "NUM DE VENDEDOR": extra.numVendedor ?? "0",
    QNA: String(
      `${numQuincenaResult} ${fechaArranque.dia} ${fechaArranque.mesLetra} ${fechaArranque.año}`,
    ),
    "AÑO DESCUENTO": fechaArranque.año,
    "MES DESCUENTO": fechaArranque.mesLetra ?? "",
    FOLIO: extra.folio ?? "",
    VENDEDOR: extra.vendedor?.toUpperCase() ?? "",
    "TELEFONO CELULAR": await formatearCadaTresCaracteres(
      extra.telefonoCelular ?? "",
    ),
    "TELEFONO CASA": await formatearCadaTresCaracteres(
      extra.telefonoCasa ?? "",
    ),
    MAIL: extra.mail ?? "",
    MESES: extra.mesesAntiguedad ?? "",
    AÑOS: extra.añosAntiguedad ?? "",
    "REFERENCIA 1": extra.referencia1 ?? "",
    "REFERENCIA 2": extra.referencia2 ?? "",
    "REFERENCIA 3": extra.referencia3 ?? "",
    Texto46: await formatearCadaTresCaracteres(extra.telefonoReferencia1 ?? ""),
    Texto47: await formatearCadaTresCaracteres(extra.telefonoReferencia2 ?? ""),
    Texto48: await formatearCadaTresCaracteres(extra.telefonoReferencia3 ?? ""),
    LUGAR: extra.lugarFecha?.toUpperCase() ?? "",
    "LUGAR Y FECHA":
      (
        `${extra.lugarFecha?.toUpperCase()}` +
        ` ${fechacontrato.dia} ${fechacontrato.mesLetra}${fechacontrato.año}`
      ).trim() ?? "",
    ECIVIL: extra.estadoCivil ?? "SOLTERO",
    "ENTRE CALLES": extra.entreCalles ?? "",

    /// Nomina-----------------------
    RFC: estadoCuenta.rfc ?? nomina.rfc,
    "INGRESO MENSUAL": `$${ingresoEnt}`,
    CENT1: ingresoCent?.toString() ?? "",
    EMPLEADO: nomina.noEmpleado ?? "",
    DEPENDENCIA: nomina.dependencia ?? "",
    DEPARTAMENTO: nomina.departamento?.toUpperCase() ?? "",
    PUESTO: nomina.puesto?.toUpperCase() ?? "",

    // ── Estado de cuenta ────────────────────────────────
    "NUMERO CUENTA": estadoCuenta.numeroCuenta ?? "",
    "CLABE INTERBANCARIA": await formatearClabe(estadoCuenta.clabe ?? ""),
    BANCOS: estadoCuenta.banco ?? "",
  };

  return rellenarCamposPDF(camposPDF);
}
