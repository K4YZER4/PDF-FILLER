<div align="right">
  <a href="../README.md">
    <img src="https://img.shields.io/badge/🇺🇸_Read_in_English-006494?style=for-the-badge&logo=readme&logoColor=white" alt="Read in English"/>
  </a>
  &nbsp;
  <a href="../README.es.md">
    <img src="https://img.shields.io/badge/🇲🇽_Leer_en_Español-01696f?style=for-the-badge&logo=readme&logoColor=white" alt="Leer en Español"/>
  </a>
</div>
# API Reference

Base URL: `http://localhost:3000`

All request and response bodies are JSON unless noted otherwise.

---

## INE

### `POST /api/ine/procesar`

Processes an uploaded INE photo and returns the extracted client data.

**Request** — `multipart/form-data`

| Field   | Type   | Description                      |
| ------- | ------ | -------------------------------- |
| `image` | `File` | JPG or PNG photo of the INE card |

**Response `200`**

```json
{
  "nombre1": "string",
  "nombre2": "string",
  "apellidoPaterno": "string",
  "apellidoMaterno": "string",
  "sexo": "string",
  "fechaNac": "string",
  "curp": "string",
  "claveElector": "string",
  "domicilio": {
    "calle": "string",
    "numeroCasa": "string",
    "colonia": "string",
    "codigoPostal": "string",
    "municipio": "string",
    "estado": "string"
  },
  "seccion": "string",
  "vigencia": "string",
  "numEmision": "string"
}
```

**Errors**

| Code  | Reason                                  |
| ----- | --------------------------------------- |
| `400` | No image uploaded or unsupported format |
| `422` | Image too low quality for OCR           |
| `500` | Internal OCR error                      |

---

## Monto

### `POST /api/monto/consultar`

Calculates the loan table for a given net amount and term.

**Request**

```json
{
  "montoNeto": 10000,
  "plazoQuincenas": 48
}
```

| Field            | Type     | Allowed values                      |
| ---------------- | -------- | ----------------------------------- |
| `montoNeto`      | `number` | Any positive number                 |
| `plazoQuincenas` | `number` | `24`, `36`, `48`, `72`, `96`, `120` |

**Response `200`**

```json
{
  "montoNeto": "number",
  "montoPagare": "number",
  "descuentoQuincenal": "number",
  "plazoQuincenas": "number",
  "plazoMeses": "number",
  "tasaMensual": "number",
  "tasaAnual": "number",
  "importeInteres": "number",
  "cat": "number"
}
```

**Errors**

| Code  | Reason                                       |
| ----- | -------------------------------------------- |
| `400` | `plazoQuincenas` not in allowed values       |
| `404` | No table entry for the given amount and term |

---

## PDF

### `POST /api/pdf/generar`

Generates a filled PDF contract and returns the binary file.

**Request**

```json
{
  "ine": {
    "nombre1": "string",
    "nombre2": "string",
    "apellidoPaterno": "string",
    "apellidoMaterno": "string",
    "curp": "string",
    "sexo": "string",
    "fechaNac": "string",
    "claveElector": "string",
    "domicilio": {
      "calle": "string",
      "numeroCasa": "string",
      "colonia": "string",
      "codigoPostal": "string",
      "municipio": "string",
      "estado": "string"
    }
  },
  "tabla": {
    "montoNeto": "number",
    "montoPagare": "number",
    "descuentoQuincenal": "number",
    "plazoQuincenas": "number",
    "tasaMensual": "number",
    "importeInteres": "number"
  },
  "extra": {
    "folio": "string",
    "rfc": "string",
    "telefonoCelular": "string",
    "telefonoCasa": "string",
    "mail": "string",
    "ingresoMensual": "string",
    "dependencia": "string",
    "empleado": "string",
    "departamento": "string",
    "puesto": "string",
    "mesesAntiguedad": "string",
    "añosAntiguedad": "string",
    "referencia1": "string",
    "telefonoReferencia1": "string",
    "referencia2": "string",
    "telefonoReferencia2": "string",
    "referencia3": "string",
    "telefonoReferencia3": "string",
    "banco": "string",
    "numeroCuenta": "string",
    "clabe": "string",
    "lugarFecha": "string",
    "vendedor": "string",
    "estadoCivil": "string"
  }
}
```

**Response `200`** — `application/pdf` binary

Returns the raw PDF file ready to download.

**Errors**

| Code  | Reason                           |
| ----- | -------------------------------- |
| `400` | Missing required fields          |
| `500` | PDF template could not be filled |
