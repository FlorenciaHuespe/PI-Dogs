const { Dog } = require("../db");
const axios = require("axios");
const API_KEY = require("../utils/config");

const getDogsByID = async (id, source) => {
  let dog;
  let dogData;

  if (source === "api") {
    const response = await axios.get(
      `https://api.thedogapi.com/v1/breeds/${id}?api_key=${API_KEY}`
    );

    dogData = response.data;

    const {
      name,
      temperament,
      breed_group,
      reference_image_id,
      height,
      weight,
      life_span,
    } = dogData;

    const image = `https://cdn2.thedogapi.com/images/${reference_image_id}.jpg`;

    const [minHeight, maxHeight] = height.metric.split(" - ");
    const [minWeight, maxWeight] = weight.metric.split(" - ");
    const [minLifeSpan, maxLifeSpan] = life_span.split(" - ");

    dog = {
      id,
      image,
      name,
      minHeight: parseInt(minHeight),
      maxHeight: parseInt(maxHeight),
      minWeight: parseInt(minWeight),
      maxWeight: parseInt(maxWeight),
      minLifeSpan: parseInt(minLifeSpan),
      maxLifeSpan: parseInt(maxLifeSpan),
      breed_group,
      db: false,
      temperaments: temperament ? temperament.split(", ").map((temp) => temp.trim()) : [],
    };
  } else {
    // Si la fuente no es "api", busca en la BD
    dog = await Dog.findByPk(id, {
      include: "Temperaments", // Incluir los temperamentos 
    });


    // Si encuentras el perro en la BD, agrega los temperamentos
    if (dog) {
      const temperaments = dog.Temperaments.map((temp) => temp.name);
      dog = {
        ...dog.toJSON(),
        db: true,
        temperaments: temperaments,
      };

      // Eliminar la propiedad "Temperaments" de la respuesta
      delete dog.Temperaments;
    }
  }

  return dog;
};

module.exports = getDogsByID;



