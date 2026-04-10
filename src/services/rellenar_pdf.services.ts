import { rellenarCamposPDF, fechaMesConLetra } from "../utils/index";
import { ContratoData } from "../types";
import {
  numeroALetrasPesos,
  numeroALetras,
} from "../utils/numero_letras.utils";

export async function generarContrato(contrato: ContratoData): Promise<Buffer> {
  const { ine, tabla, extra } = contrato;
  console.error("Extra:", contrato);
  // ── Separar centavos ──────────────────────────
  const [montoEnt, montoCent] = tabla.montoNeto.toFixed(2).split(".");
  const [pagareEnt, pagareCent] = tabla.montoPagare.toFixed(2).split(".");
  const [descEnt, descCent] = tabla.descuentoQuincenal.toFixed(2).split(".");

  // ── Fecha del contrato ────────────────────────
  // ── Fecha del contrato ────────────────────────
  const fechaontrato = fechaMesConLetra(extra.fechaContrato ?? "");
  const fechaArranque = fechaMesConLetra(extra.fechaArranque ?? "");
  // Agregar arriba, antes de la función

  const camposPDF: Record<string, string> = {
    // ── INE ──────────────────────────────────────
    "NOMBRE 1": ine.nombre1,
    "NOMBRE 2": ine.nombre2,
    "APELLIDO 1": ine.apellidoPaterno,
    "APELLIDO 2": ine.apellidoMaterno,
    CURP: ine.curp,
    NDIA: ine.fechaNac.split("/")[0],
    NMES: ine.fechaNac.split("/")[1],
    NAÑO: ine.fechaNac.split("/")[2],
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
      `${ine.nombre1} ${ine.nombre2} ${ine.apellidoPaterno} ${ine.apellidoMaterno}`.trim(),

    // ── Tabla ─────────────────────────────────────
    "MONTO CAPITAL": `$${montoEnt}`,
    CENT1: montoCent,
    "MONTO TOTAL": `$${pagareEnt}`,
    CENT2: pagareCent,
    DESCUENTO: descEnt,
    CENT3: descCent,
    "TASA ANUAL": String(tabla.tasaMensual * 12),
    CAT: String(tabla.cat.toFixed(2)),
    PLAZO1: `${tabla.plazoQuincenas}`,
    "PLAZO LETRA": numeroALetras(tabla.plazoQuincenas),
    "MONTO TOTAL LETRA": numeroALetrasPesos(tabla.montoPagare).split(
      " PESOS",
    )[0], // Solo la parte en letras, sin "PESOS"
    "DESCUENTO LETRA": numeroALetrasPesos(tabla.descuentoQuincenal).split(
      "PESOS",
    )[0],

    // ── Fecha contrato ────────────────────────────
    DIA: fechaontrato.dia,
    MES: fechaontrato.mesLetra,
    AÑO: fechaontrato.año,
    "MES DESCUENTO": extra.mesDescuento ?? "",
    "AÑO DESCUENTO": extra.añoDescuento ?? "",
    // "INICIO QNA": extra.inicioQna ?? "",

    // ── Extra ─────────────────────────────────────
    QNA: String(
      ` ${fechaArranque.dia} ${fechaArranque.mesLetra}${fechaArranque.año}`,
    ),
    FOLIO: extra.folio ?? "",
    RFC: extra.rfc ?? "",
    VENDEDOR: extra.vendedor ?? "",
    "TELEFONO CELULAR": extra.telefonoCelular ?? "",
    "TELEFONO CASA": extra.telefonoCasa ?? "",
    MAIL: extra.mail ?? "",
    "INGRESO MENSUAL": `$${extra.ingresoMensual ?? ""}`,
    DEPENDENCIA: extra.dependencia ?? "",
    EMPLEADO: extra.empleado?.toUpperCase() ?? "",
    DEPARTAMENTO: extra.departamento?.toUpperCase() ?? "",
    PUESTO: extra.puesto?.toUpperCase() ?? "",
    MESES: extra.mesesAntiguedad ?? "",
    AÑOS: extra.añosAntiguedad ?? "",
    "REFERENCIA 1": extra.referencia1 ?? "",
    "REFERENCIA 2": extra.referencia2 ?? "",
    "REFERENCIA 3": extra.referencia3 ?? "",
    Texto46: extra.telefonoReferencia1 ?? "",
    Texto47: extra.telefonoReferencia2 ?? "",
    Texto48: extra.telefonoReferencia3 ?? "",
    "NUMERO CUENTA": extra.numeroCuenta ?? "",
    "CLABE INTERBANCARIA": extra.clabe ?? "",
    "LUGAR Y FECHA":
      (
        `${extra.lugarFecha?.toUpperCase()}` +
        ` ${fechaontrato.dia} ${fechaontrato.mesLetra}${fechaontrato.año}`
      ).trim() ?? "",

    // ── Dropdowns ────────────────────────────────
    ECIVIL: extra.estadoCivil ?? "SOLTERO",
    BANCOS: extra.banco ?? "",
  };

  return rellenarCamposPDF(camposPDF);
}
