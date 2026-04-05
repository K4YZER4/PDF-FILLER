import { validarMontoQuincenal } from "./monto_quincenal.middlewares";
import { validarRellenarPDF } from "./relenar_pdf_validar.middlewares";
import upload from "./validar_imagen.middlewares"; // Aqui no usamos { } porque es un export default simplemente le damos un nombre a la variable que va a importar el valor exportado por default

export { validarMontoQuincenal, validarRellenarPDF, upload };
