<div align="right">
  <a href="../README.md">
    <img src="https://img.shields.io/badge/🇺🇸_Read_in_English-006494?style=for-the-badge&logo=readme&logoColor=white" alt="Read in English"/>
  </a>
  &nbsp;
  <a href="../README.es.md">
    <img src="https://img.shields.io/badge/🇲🇽_Leer_en_Español-01696f?style=for-the-badge&logo=readme&logoColor=white" alt="Leer en Español"/>
  </a>
</div>
# Setup & Running

## Prerequisites

- Node.js 20+
- npm 9+

## Install

```bash
git clone https://github.com/K4YZER4/PDF-FILLER.git
cd PDF-FILLER
npm install
```

## Environment variables

```bash
cp .env.example .env
```

| Variable | Default | Description                |
| -------- | ------- | -------------------------- |
| `PORT`   | `3000`  | Port the server listens on |

## Required files

Place these in the project root before running:

| File              | Description                             |
| ----------------- | --------------------------------------- |
| `contrato.pdf`    | PDF template with named form fields     |
| `*.xlsx`          | Discount tables file                    |
| `spa.traineddata` | Tesseract Spanish language data for OCR |

> ⚠️ These files are not committed to the repository because they contain proprietary data.

## Run

```bash
# Development
npm run dev

# Build + production
npm run build
npm start
```

The web form is available at:

```
http://localhost:3000/generador.html
```
