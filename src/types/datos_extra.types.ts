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
  dependencia?: string;
  empleado?: string;
  departamento?: string;
  puesto?: string;
  mesesAntiguedad?: string;
  añosAntiguedad?: string;

  // Referencias
  referencia1?: string;
  referencia2?: string;
  referencia3?: string;
  telefonoReferencia1?: string;
  telefonoReferencia2?: string;
  telefonoReferencia3?: string;
  // Bancario
  numeroCuenta?: string;
  clabe?: string;
  banco?: string;

  // Contrato
  lugarFecha?: string;
  fechaContrato?: string;
  mesDescuento?: string;
  añoDescuento?: string;
  vendedor?: string;
  fechaArranque?: string;
  // Personal
  estadoCivil?: string;
}

export { DatosExtra };
