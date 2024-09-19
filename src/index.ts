import express from "express";
import { connectDB, getDB } from "./config/db";  
import houseApi from "./api/houseApi";
import dotenv from 'dotenv';

dotenv.config();

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
    await connectDB(); // Conecta a la base de datos
    
    // Accede a la base de datos y almacena en `app.locals` para uso en las rutas
    app.locals.db = getDB();
    
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1); // Salir si no se puede conectar a la base de datos
  }
};

startServer();
