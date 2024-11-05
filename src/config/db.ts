import { MongoClient, Db } from "mongodb";
import mockHouses from "../mock/dataMock";

interface MockCollection {
  find: () => {
    toArray: () => Promise<typeof mockHouses>;
  };
  findOne: (query: {
    _id: string;
  }) => Promise<(typeof mockHouses)[0] | undefined>;
  updateOne: (
    query: { _id: string },
    update: { $push: { reviews: { $each: any[] } } }
  ) => Promise<{ matchedCount: number }>;
}

let db: Db | null = null;

export const connectDB = async () => {
  const useMocks = process.env.USE_MOCKS === "true";

  if (useMocks) {
    // Usar datos mock
    db = {
      collection: (name: string) => {
        if (name === "listingsAndReviews") {
          return {
            find: () => ({
              toArray: async () => mockHouses,
            }),
            findOne: async (query: { _id: string }) => {
              return mockHouses.find((house) => house._id === query._id);
            },
            updateOne: async (
              query: { _id: string },
              update: { $push: { reviews: { $each: any[] } } }
            ) => {
              const house = mockHouses.find((h) => h._id === query._id);
              if (house) {
                house.reviews.unshift(update.$push.reviews.$each[0]);
                return { matchedCount: 1 };
              }
              return { matchedCount: 0 };
            },
          } as unknown as MockCollection;
        }
        return null;
      },
    } as unknown as Db;
    console.log("Usando datos mock en lugar de MongoDB");
  } else {
    // Conectar a MongoDB Atlas
    const client = new MongoClient(process.env.MONGO_ATLAS_URI || "");
    try {
      await client.connect();
      db = client.db("airbnb");
      console.log("Conectado a MongoDB Atlas");
    } catch (error) {
      console.error("Error al conectar a MongoDB:", error);
      throw error;
    }
  }
};

export const getDB = () => db;
