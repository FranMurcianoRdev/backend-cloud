
import { MongoClient } from "mongodb";

const url = 'mongodb://localhost:27017'; 
const client = new MongoClient(url);

const dbName = 'airbnb';

export const connectDB = async () => {
  try {
    // Conectar con MongoDB
    await client.connect();
    console.log("Conectado a MongoDB");
    return client.db(dbName); // Retornar la base de datos
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
    throw error;
  }
};
