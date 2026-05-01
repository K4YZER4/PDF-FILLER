interface IneData {
  nombre1: string;
  nombre2: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  sexo: "F" | "M";
  fechaNac: string;
  curp: string;
  claveElector: string;
  domicilio: Domicilio;
  seccion: string;
  vigencia: string;
  numEmision: string;
}

interface Domicilio {
  calle: string;
  numeroCasa: string;
  colonia: string;
  codigoPostal: string;
  municipio: string;
  estado: string;
}
interface CurpValidada {
  valido: boolean | null;
  mensaje: string;
}
interface IneValida extends IneData {
  curpValidada: CurpValidada;
}
export { IneData, Domicilio, CurpValidada, IneValida };
