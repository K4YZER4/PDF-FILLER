import { rellenarCamposPDF } from "../utils/rellenar_pdf.utils";
import { ContratoData } from "../types";
import { numeroALetras } from "../utils/numero_letras.utils";

export async function generarContrato(contrato: ContratoData): Promise<Buffer> {
  const { ine, tabla, extra } = contrato;

  // ── Separar centavos ──────────────────────────
  const [montoEnt, montoCent] = tabla.montoNeto.toFixed(2).split(".");
  const [pagareEnt, pagareCent] = tabla.montoPagare.toFixed(2).split(".");
  const [descEnt, descCent] = tabla.descuentoQuincenal.toFixed(2).split(".");

  // ── Fecha del contrato ────────────────────────
  const fecha = extra.fechaContrato?.split("/") ?? ["", "", ""];

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
    "MONTO CAPITAL": montoEnt,
    CENT1: montoCent,
    "MONTO TOTAL": pagareEnt,
    CENT2: pagareCent,
    DESCUENTO: descEnt,
    CENT3: descCent,
    "TASA ANUAL": String(tabla.tasaMensual * 12),
    CAT: String(tabla.cat),
    QNA: String(tabla.plazoQuincenas),
    "PLAZO LETRA": `${tabla.plazoQuincenas} QUINCENAS`,
    "MONTO TOTAL LETRA": numeroALetras(tabla.montoPagare),
    "DESCUENTO LETRA": numeroALetras(tabla.descuentoQuincenal),

    // ── Fecha contrato ────────────────────────────
    DIA: fecha[0],
    MES: fecha[1],
    AÑO: fecha[2],
    "MES DESCUENTO": extra.mesDescuento ?? "",
    "AÑO DESCUENTO": extra.añoDescuento ?? "",
    "INICIO QNA": extra.inicioQna ?? "",

    // ── Extra ─────────────────────────────────────
    FOLIO: extra.folio ?? "",
    RFC: extra.rfc ?? "",
    VENDEDOR: extra.vendedor ?? "",
    "TELEFONO CELULAR": extra.telefonoCelular ?? "",
    "TELEFONO CASA": extra.telefonoCasa ?? "",
    MAIL: extra.mail ?? "",
    "INGRESO MENSUAL": extra.ingresoMensual ?? "",
    DEPENDENCIA: extra.dependencia ?? "",
    EMPLEADO: extra.empleado ?? "",
    DEPARTAMENTO: extra.departamento ?? "",
    PUESTO: extra.puesto ?? "",
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
    "LUGAR Y FECHA": extra.lugarFecha ?? "",

    // ── Dropdowns ────────────────────────────────
    ECIVIL: extra.estadoCivil ?? "SOLTERO",
    BANCOS: extra.banco ?? "",
  };

  return rellenarCamposPDF(camposPDF);
}
