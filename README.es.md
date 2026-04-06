<div align="right">
  <a href="./README.md">
    <img src="https://img.shields.io/badge/🇺🇸_Read_in_English-006494?style=for-the-badge&logo=readme&logoColor=white" alt="Read in English"/>
  </a>
</div>
# PDF Filler — Generador de Contratos de Descuento Vía Nómina

> 📄 English version: [README.md](./README.md)

Servicio backend que automatiza el ciclo completo de contratos de descuento vía nómina para instituciones financieras — desde leer la INE del cliente mediante OCR, hasta calcular la tabla de crédito desde un Excel, hasta generar el PDF listo para firmar.

Desarrollado para uso real en producción en **Credifom, S.A.P.I. de C.V., S.O.F.O.M., E.N.R.**

![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![Licencia](https://img.shields.io/badge/licencia-Privada-red)

---

## Qué hace

- **OCR de INE** — Sube una foto de la credencial de elector y extrae todos los campos del cliente automáticamente (nombres, CURP, domicilio, clave de elector, etc.)
- **Calculadora de tabla de crédito** — Dado un monto y plazo, calcula el descuento quincenal, monto pagaré, intereses y CAT desde una tabla de descuento en Excel pre-cargada
- **Generación de PDF** — Rellena cada campo nombrado en una plantilla PDF y devuelve el contrato listo para descargar
- **Frontend web** — Formulario HTML de 3 pestañas (Cliente · Monto · Extras) servido directamente por Express, sin servidor frontend separado

---

## Stack Tecnológico

|               |                                  |
| ------------- | -------------------------------- |
| **Runtime**   | Node.js 20                       |
| **Lenguaje**  | TypeScript 5                     |
| **Framework** | Express 4                        |
| **PDF**       | pdf-lib                          |
| **OCR**       | Tesseract.js + `spa.traineddata` |
| **Excel**     | xlsx                             |

---

## Documentación

| Documento                                  | Descripción                                          |
| ------------------------------------------ | ---------------------------------------------------- |
| [Instalación y ejecución](./docs/setup.md) | Instalación, variables de entorno, cómo correr       |
| [Referencia API](./docs/api.md)            | Todos los endpoints con ejemplos de request/response |
| [Arquitectura](./docs/architecture.md)     | Estructura del proyecto y flujo de datos             |
