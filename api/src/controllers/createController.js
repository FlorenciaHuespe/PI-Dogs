const { Dog, Temperament } = require("../db");

const createDog = async (
  name,
  image,
  minHeight,
  maxHeight,
  minWeight,
  maxWeight,
  minLifeSpan,
  maxLifeSpan,
  breed_group,
  temperaments
) => {
  const newDog = await Dog.create({
    name,
    image,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    minLifeSpan,
    maxLifeSpan,
    breed_group,
  });


  // Buscamos los temperamentos en la BD  
  const temperamentPromises = temperaments.map(async (t) => {
    const temperamentBD = await Temperament.findAll({ where: { name: t } });
    return temperamentBD;
  });

  // Espera a que todas las búsquedas de temperamentos se completen
  const allTemperaments = await Promise.all(temperamentPromises);


  const flattenedTemperaments = allTemperaments.flat();
  await newDog.addTemperaments(flattenedTemperaments);   // Agrega los temperamentos a la raza con el mixins de sequelize(add)


  return newDog;
};


module.exports = createDog;
