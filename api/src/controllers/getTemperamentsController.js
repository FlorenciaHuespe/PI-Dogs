const { Temperament } = require("../db");
const axios = require("axios");
const API_KEY = require("../utils/config");

const getAllTemperaments = async () => {
  try {
    const temperamentDB = await Temperament.findAll(); // Busca todos los temperamentos en la BD

    if (temperamentDB.length === 0) { //Si no se encuentran temperamentos en la BD procede a obtenerlos de la API
      const response = await axios.get(
        "https://api.thedogapi.com/v1/breeds",
        {
          headers: {
            "x-api-key": API_KEY,
          },
        }
      );

      const allTemperaments = new Set(); // Set saca los repetidos, pero nos devuelve un obj

      response.data.forEach((breed) => {
        const breedTemperaments = breed.temperament ? breed.temperament.split(", ") : [];
        breedTemperaments.forEach((temperament) => {
          allTemperaments.add(temperament);
        });
      });

      const tempArray = Array.from(allTemperaments);

      // Guardamos los temperamentos en la BD
      await Promise.all(tempArray.map(async (t) => {
        await Temperament.findOrCreate({
          where: {
            name: t,
          },
        });
      }));

      return tempArray;
    }

    const tempDataBase = temperamentDB.map((t) => t.name);
    return tempDataBase;
  } catch (error) {
    console.error("Error al obtener temperamentos:", error);
    throw error;
  }
};

module.exports = { getAllTemperaments };
