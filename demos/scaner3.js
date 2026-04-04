// En tu archivo principal (ej. index.js o donde uses scaner2.js)
import { rellenarContrato } from "./rellenarContrato.js";

// Los datos que ya te da scaner2.js
const datosINE = {
  nombre: "HORACIO",
  apellidoPaterno: "ALVAREZ",
  apellidoMaterno: "ESCOBEDO",
  fechaNac: "27/08/2006",
  curp: "AAEH060827HSLLSRA2",
  domicilio: {
    calle: "CARLOS FUENTES",
    numeroCasa: "254",
    colonia: "SANTA MARIA",
    codigoPostal: "81045",
    municipio: "UNIDOS",
    estado: "",
  },
};

// Opción A: Guardarlo en disco
await rellenarContrato(datosINE, "./contrato.pdf", "./contrato_relleno.pdf");

// Opción B: Retornar como Buffer (para mandarlo por API/HTTP)
const buffer = await rellenarContrato(datosINE, "./contrato.pdf");
res.set("Content-Type", "application/pdf");
res.send(buffer);
