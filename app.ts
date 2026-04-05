import "dotenv/config";
import { cargarTablas } from "./src/utils/tabla_cargar.utils";
// import dotenv from "dotenv";
// dotenv.config();
import express from "express";
import routerINE from "./src/routes/validacion_ine.routes";
import routerMontoQuincenal from "./src/routes/monto_quincenal.routes";
const app = express();
cargarTablas();
app.use(express.json());
app.use("/api/ine", routerINE);
app.use("/api/monto", routerMontoQuincenal);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app;
