import { DatosExtra } from "./datos_extra.types";
import { IneData, IneValida } from "./ine.types";
import { FilaTabla } from "./tabla.types";
import { EstadoCuentaDatos, EstadoCuentaResponse } from "./estado_Cuenta.types";
import { NominaDatos, NominaResponse } from "./nomina.types";
interface ContratoData {
  ine: IneData;
  tabla: FilaTabla;
  extra: DatosExtra;
  estadoCuenta: EstadoCuentaDatos;
  nomina: NominaDatos;
}
export {
  ContratoData,
  DatosExtra,
  IneData,
  IneValida,
  FilaTabla,
  EstadoCuentaDatos,
  EstadoCuentaResponse,
  NominaDatos,
  NominaResponse,
};
