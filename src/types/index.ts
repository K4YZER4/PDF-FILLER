import { DatosExtra } from "./datos_extra.types";
import { IneData, IneValida } from "./ine.types";
import { FilaTabla } from "./tabla.types";
interface ContratoData {
  ine: IneData;
  tabla: FilaTabla;
  extra: DatosExtra;
}
export { ContratoData, DatosExtra, IneData, IneValida, FilaTabla };
