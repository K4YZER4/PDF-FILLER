// src/services/rellenar_pdf.services.ts
import { rellenarCamposPDF } from "../utils/rellenar_pdf.utils";
import { ContratoData } from "../types";

export async function generarContrato(contrato: ContratoData): Promise<Buffer> {
  const { ine, tabla, extra } = contrato; // ← desestructuras aquí

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

    // ── Tabla ────────────────────────────────────
    "MONTO CAPITAL": String(tabla.montoNeto),
    "MONTO TOTAL": String(tabla.montoPagare),
    DESCUENTO: String(tabla.descuentoQuincenal),
    "TASA ANUAL": String(tabla.tasaMensual * 12),
    // Agregar en la sección tabla del service:
    CAT: String(tabla.cat),
    QNA: String(tabla.plazoQuincenas), // quincenal count
    "PLAZO LETRA": `${tabla.plazoQuincenas} QUINCENAS`,

    // ── Extra con defaults de prueba ─────────────
    FOLIO: extra.folio ?? "TEST-001",
    RFC: extra.rfc ?? "XAXX010101000",
    "TELEFONO CELULAR": extra.telefonoCelular ?? "6671234567",
    "TELEFONO CASA": extra.telefonoCasa ?? "6671234567",
    MAIL: extra.mail ?? "test@test.com",
    "INGRESO MENSUAL": extra.ingresoMensual ?? "10000",
    DEPENDENCIA: extra.dependencia ?? "SEPyC",
    EMPLEADO: extra.empleado ?? "12345",
    DEPARTAMENTO: extra.departamento ?? "EDUCACION",
    PUESTO: extra.puesto ?? "DOCENTE",
    MESES: extra.mesesAntiguedad ?? "6",
    AÑOS: extra.añosAntiguedad ?? "5",
    "REFERENCIA 1": extra.referencia1 ?? "REF TEST 1",
    "REFERENCIA 2": extra.referencia2 ?? "REF TEST 2",
    "REFERENCIA 3": extra.referencia3 ?? "REF TEST 3",
    "NUMERO CUENTA": extra.numeroCuenta ?? "1234567890",
    "CLABE INTERBANCARIA": extra.clabe ?? "002320701234567890",
    "LUGAR Y FECHA": extra.lugarFecha ?? "GUASAVE, SIN.",
  };

  return rellenarCamposPDF(camposPDF);
}
