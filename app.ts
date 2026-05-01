import "dotenv/config";
import { cargarTablas } from "./src/utils/tabla_cargar.utils";
import path from "path";
import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config();
import express from "express";
import { config } from "./src/config";
import helmet from "helmet";
import {
  routerINE,
  routerQuincenas,
  routerPDF,
  nominaRouter,
  routerEstadoCuenta,
} from "./src/routes";
const app = express();
cargarTablas();
app.use(express.static(path.join(__dirname, "./public")));

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: config.FRONTEND_URL, // Desarrollo: localhost
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use("/api", routerEstadoCuenta);
app.use("/api/ine", routerINE);
app.use("/api/monto", routerQuincenas);
app.use("/api/pdf", routerPDF);
app.use("/api", nominaRouter);
const PORT = config.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
