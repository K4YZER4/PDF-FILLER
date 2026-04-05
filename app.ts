import "dotenv/config";
import { cargarTablas } from "./src/utils/tabla_cargar.utils";
// import dotenv from "dotenv";
// dotenv.config();
import express from "express";
import { routerINE, routerQuincenas, routerPDF } from "./src/routes";
const app = express();
cargarTablas();
app.use(express.json());
app.use("/api/ine", routerINE);
app.use("/api/monto", routerQuincenas);
app.use("/api/pdf", routerPDF);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
