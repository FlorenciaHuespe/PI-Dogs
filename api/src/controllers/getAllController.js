const axios = require("axios");
const { Dog, Temperament } = require("../db");
const API_KEY = require("../utils/config");
const { Op } = require("sequelize");

const cleanArray = (arr) => {
  const clean = arr.map((elem) => {
    //limpiamos la data de la API con los datos necesarios
    const cleanedDog = {
      id: elem.id,
      image: `https://cdn2.thedogapi.com/images/${elem.reference_image_id}.jpg`,
      name: elem.name,
      minHeight: parseInt(elem.height.metric.split("-")[0]),
      maxHeight: parseInt(elem.height.metric.split("-")[1]),
      minWeight: parseInt(elem.weight.metric.split("-")[0]),
      maxWeight: parseInt(elem.weight.metric.split("-")[1]),
      minLifeSpan: parseInt(elem.life_span.split("-")[0]),
      maxLifeSpan: parseInt(elem.life_span.split("-")[1]),
      breed_group: elem.breed_group,
      db: false,
      temperaments: elem.temperament?.split(", "),
    };
    return cleanedDog;
  });
  return clean;
};

const getAllDogs = async () => {
  // perros de la DB
  const databaseDogs = await Dog.findAll({
    include: {
      // le incluyo el modelo
      model: Temperament,
      through: { attributes: [] },
      attributes: ["name"],
    },
  });

  const apiDogRaw = // perros de la API y sus imágenes
    (
      await axios.get(
        "https://api.thedogapi.com/v1/breeds" + "?api_key=" + API_KEY
      )
    ).data;

  const apiDog = cleanArray(apiDogRaw); // dog api sin limpiar

  // Limpia los temperamentos en BD
  const cleanedDatabaseDogs = databaseDogs.map((dbDog) => ({
    id: dbDog.id,
    image: dbDog.image,
    name: dbDog.name,
    minHeight: dbDog.minHeight,
    maxHeight: dbDog.maxHeight,
    minWeight: dbDog.minWeight,
    maxWeight: dbDog.maxWeight,
    minLifeSpan: dbDog.minLifeSpan,
    maxLifeSpan: dbDog.maxLifeSpan,
    breed_group: dbDog.breed_group,
    db: true,
    temperaments: dbDog.Temperaments.map((t) => t.name.toLowerCase()),
  }));

  const combinedDogs = [...cleanedDatabaseDogs, ...apiDog];

  return combinedDogs;
};

const getDogByName = async (name) => {
  const databaseDogs = await Dog.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name.toLowerCase()}%`,
      },
    },
  });

  // Obtén los temperamentos asociados a cada perro
  const dogTemperaments = await Promise.all(
    databaseDogs.map(async (dog) => {
      const temperaments = await dog.getTemperaments({
        attributes: ["name"],
      });
      return {
        ...dog.toJSON(),
        temperaments: temperaments.map((t) => t.name.toLowerCase()),
      };
    })
  );

  const apiDogRaw = (
    await axios.get(
      "https://api.thedogapi.com/v1/breeds" + "?api_key=" + API_KEY
    )
  ).data;

  const apiDog = cleanArray(apiDogRaw);

  const filteredApiDog = apiDog.filter((dog) => {
    return (
      dog.name.toLowerCase().includes(name.toLowerCase()) ||
      name.toLowerCase().includes(dog.name.toLowerCase())
    );
  });

  if (filteredApiDog.length === 0 && databaseDogs.length === 0) {
    throw new Error("La raza solicitada no se encuentra");
  }

  // Combina los resultados de la BD y la API
  const combinedDogs = [...dogTemperaments, ...filteredApiDog];

  // Elimina duplicados basados en el ID
  const uniqueDogs = Array.from(new Set(combinedDogs.map((dog) => dog.id))).map(
    (id) => {
      return combinedDogs.find((dog) => dog.id === id);
    }
  );

  return uniqueDogs;
};

module.exports = { getDogByName, getAllDogs };
