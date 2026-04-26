interface DatosExtra {
  // Identificación
  folio?: string;
  rfc?: string;

  // Contacto
  telefonoCelular?: string;
  telefonoCasa?: string;
  mail?: string;

  // Económico
  ingresoMensual?: string;

  // Empleo
  mesesAntiguedad?: string;
  añosAntiguedad?: string;

  // Referencias
  referencia1?: string;
  referencia2?: string;
  referencia3?: string;
  telefonoReferencia1?: string;
  telefonoReferencia2?: string;
  telefonoReferencia3?: string;
  // Contrato
  lugarFecha?: string;
  fechaContrato?: string;
  mesDescuento?: string;
  añoDescuento?: string;
  vendedor?: string;
  fechaArranque?: string;
  sucursal?: string;
  numVendedor?: string;
  // Personal
  estadoCivil?: string;
}

export { DatosExtra };
