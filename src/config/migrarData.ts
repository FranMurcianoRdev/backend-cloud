const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
dotenv.config();

const localUri = process.env.MONGO_URI;
const atlasUri = process.env.MONGO_ATLAS_DB_URI;

async function migrateData() {
  let localClient, atlasClient;

  try {
    // Conectar a la base de datos MongoDB local
    localClient = new MongoClient(localUri);
    await localClient.connect();
    const localDb = localClient.db(); 

    // Conectar a MongoDB Atlas
    atlasClient = new MongoClient(atlasUri);
    await atlasClient.connect();
    const atlasDb = atlasClient.db(); 

    // Nombre de la colección que vamos a migrar
    const collectionName = 'listingsAndReviews';

    // Obtener los documentos de la colección local
    const localCollection = localDb.collection(collectionName);
    const data = await localCollection.find({}).toArray(); // Obtener todos los documentos

    console.log(`Migrando ${data.length} documentos de ${collectionName} a MongoDB Atlas...`);

    if (data.length > 0) {
      // Insertar los documentos en la colección de Atlas
      const atlasCollection = atlasDb.collection(collectionName);
      const insertResult = await atlasCollection.insertMany(data);

      console.log(`${insertResult.insertedCount} documentos insertados en MongoDB Atlas.`);
    } else {
      console.log('No hay documentos para migrar.');
    }

  } catch (err) {
    console.error('Error durante la migración:', err);
  } finally {
    // Cerrar conexiones
    if (localClient) await localClient.close();
    if (atlasClient) await atlasClient.close();
  }
}

// Ejecutar la migración
migrateData().then(() => {
  console.log('Migración completada.');
}).catch(console.error);
