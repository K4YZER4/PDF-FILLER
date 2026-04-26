// estado_cuenta.types.ts

interface EstadoCuentaDatos {
  nombreTitular: string;
  rfc: string;
  banco: string;
  numeroCuenta: string;
  clabe: string;
  periodoInicio: string;
  periodoFin: string;
  saldoAlCorte: number;
  saldoPromedio: number;
  totalDepositos: number;
}

interface EstadoCuentaResponse {
  datos: EstadoCuentaDatos;
}

export { EstadoCuentaDatos, EstadoCuentaResponse };
