<div align="right">
  <a href="./README.es.md">
    <img src="https://img.shields.io/badge/🇲🇽_Leer_en_Español-01696f?style=for-the-badge&logo=readme&logoColor=white" alt="Leer en Español"/>
  </a>
</div>
# PDF Filler — Payroll Discount Contract Generator

Backend service that automates the full lifecycle of payroll discount consent contracts for financial institutions — from reading a client's Mexican ID via OCR, to calculating the loan table from an Excel file, to generating a ready-to-sign PDF contract.

Built for real-world production use at **Credifom, S.A.P.I. de C.V., S.O.F.O.M., E.N.R.**

![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![License](https://img.shields.io/badge/license-Private-red)

---

## What it does

- **INE OCR** — Uploads a photo of a Mexican ID card and extracts all client fields automatically (names, CURP, address, voter key, etc.)
- **Loan table calculator** — Given an amount and term, computes the biweekly payment, total amount, interest, and CAT from a pre-loaded Excel discount table
- **PDF contract generation** — Fills every named field in a PDF template and returns a download-ready contract
- **Web frontend** — 3-tab HTML form (Client · Amount · Extras) served directly by Express, no separate frontend server needed

---

## Tech Stack

|               |                                  |
| ------------- | -------------------------------- |
| **Runtime**   | Node.js 20                       |
| **Language**  | TypeScript 5                     |
| **Framework** | Express 4                        |
| **PDF**       | pdf-lib                          |
| **OCR**       | Tesseract.js + `spa.traineddata` |
| **Excel**     | xlsx                             |

---

## Docs

| Document                               | Description                                  |
| -------------------------------------- | -------------------------------------------- |
| [Setup & Running](./docs/setup.md)     | Install, env vars, how to run                |
| [API Reference](./docs/api.md)         | All endpoints with request/response examples |
| [Architecture](./docs/architecture.md) | Project structure and data flow              |
