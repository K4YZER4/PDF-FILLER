interface NominaDatos {
  noEmpleado: string;
  rfc: string;
  puesto: string;
  departamento: string;
  dependencia: string;
  percepcionNomina1: number;
  percepcionNomina2: number;
  ingresoMensual: number;
}

interface NominaResponse {
  datos: NominaDatos;
}

export { NominaDatos, NominaResponse };
