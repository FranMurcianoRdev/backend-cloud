import { Router } from "express";
import { houseToHouseApiList } from "../mappers/houseMapperPrincipal";
import { houseToHouseApiDetail } from "../mappers/houseMapper";
import { isValidReview } from "../helpers/validationHelper";
import { createCountryFilter } from "../helpers/countryFilterHelper";
import { paginate } from "../helpers/paginationHelper";

const houseApi = Router();

houseApi
  // Listado de las casas
  .get("/", async (req, res) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10; // Número de elementos por página
    const country = req.query.country as string;
    
    try {
      const db = req.app.locals.db;

      // Validar que page y limit sean positivos
      if (page <= 0 || limit <= 0) {
        return res.status(400).send({ message: "La página y el límite deben ser números positivos." });
      }

      // Calcular el número de documentos a saltar
      const skip = (page - 1) * limit;

      // Usar el helper createCountryFilter para construir el filtro
      const query = createCountryFilter(country);

      let houses: any[];

      if (db.collection) {
        // Con base de datos MongoDB
        houses = await db.collection('listingsAndReviews')
          .find(query)
          .toArray();
        houses = paginate(houses, skip, limit); // Aplicar paginación
      } else {
        // Con datos mock
        houses = (await db.collection('listingsAndReviews').find(query).toArray()) as any[];
        houses = paginate(houses, skip, limit); // Aplicar paginación
      }

      const houseList = houses.map(houseToHouseApiList);
  
      res.send(houseList);
    } catch (error) {
      console.error("Error al obtener las casas:", error);
      res.status(500).send({ message: "Error al obtener las casas" });
    }
  })
  // Obtener el detalle de una casa
  .get("/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const db = req.app.locals.db;
      
      let house;

      if (db.collection) {
        // Con base de datos MongoDB
        house = await db.collection('listingsAndReviews').findOne({ _id: id });
      } else {
        // Con datos mock
        house = (await db.collection('listingsAndReviews').findOne({ _id: id })) as any;
      }

      if (!house) {
        return res.status(404).send({ message: "Casa no encontrada" });
      }

      const houseDetail = houseToHouseApiDetail(house);
  
      res.send(houseDetail);
    } catch (error) {
      console.error("Error al obtener la casa:", error);
      res.status(500).send({ message: "Error al obtener la casa" });
    }
  })
  // Para insertar una review en la casa
  .post("/:id/reviews", async (req, res) => {
    const { id } = req.params;
    const { name, comment } = req.body; 
  
    if (!isValidReview({ name, comment })) { 
      return res.status(400).send({ message: "La reseña debe tener un nombre y un comentario." });
    }
  
    try {
      const db = req.app.locals.db;
  
      let house;

      if (db.collection) {
        // Con base de datos MongoDB
        house = await db.collection('listingsAndReviews').findOne({ _id: id });
        if (!house) {
          return res.status(404).send({ message: "Casa no encontrada." });
        }

        const reviewId = String(house.reviews.length + 1); // ID basado en la cantidad actual de reseñas

        const newReview = {
          _id: reviewId,
          reviewer_name: name, 
          comments: comment,    
          date: new Date(),     
        };

        const result = await db.collection('listingsAndReviews').updateOne(
          { _id: id },
          { $push: { reviews: { $each: [newReview], $position: 0 } } }
        );

        if (result.matchedCount === 0) {
          return res.status(404).send({ message: "Casa no encontrada." });
        }

        res.status(201).send({ message: "Reseña añadida con éxito", review: newReview });
      } else {
        // Con datos mock
        house = (await db.collection('listingsAndReviews').findOne({ _id: id })) as any;
        if (!house) {
          return res.status(404).send({ message: "Casa no encontrada." });
        }

        const reviewId = String(house.reviews.length + 1); // ID basado en la cantidad actual de reseñas

        const newReview = {
          _id: reviewId,
          reviewer_name: name, 
          comments: comment,    
          date: new Date(),     
        };

        house.reviews.unshift(newReview);
        return res.status(201).send({ message: "Reseña añadida con éxito", review: newReview });
      }
    } catch (error) {
      console.error("Error al añadir la reseña:", error);
      res.status(500).send({ message: "Error al añadir la reseña", error });
    }
  });

export default houseApi;
