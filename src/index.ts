import express from "express";
import { connectDB } from "./config/db";  
import houseApi from "./api/houseApi";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("My awesome house portal");
});

app.use("/api/houses", houseApi);

// Conectar a la base de datos MongoDB y luego iniciar el servidor
const startServer = async () => {
  try {
    const db = await connectDB(); // Conecta a la base de datos
    app.locals.db = db; // Guarda la instancia de la base de datos en `app.locals` para que sea accesible

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1); //Salir si no se puede conectar a la base de datos
  }
};

startServer();

