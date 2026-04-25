@echo off
REM Script para iniciar el servidor y abrir el navegador en la app

start cmd /k "npm run dev"

REM Espera unos segundos para que el servidor arranque
ping 127.0.0.1 -n 5 > nul

REM Abre el navegador en la página del generador
start http://localhost:3000/generador.html
