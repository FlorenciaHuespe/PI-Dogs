// const { url } = require("inspector");
// const { Temperament } = require("../models");
// const { URL} = require("../utils/config"); https://api.thedogapi.com/v1/breeds
// const axios = require("axios");

// const chargeTemperamentsToDB = async () => {
//   let dogsAPI = await axios.get(URL);

//   dogsAPI.data.forEach((dog) => {
//     if (dog.temperament) {
//       const temps = dog.temperament.split(", ");
//       temps.forEach((temp) =>
//         Temperament.findOrCreate({
//           where: {
//             name: temp,
//           },
//         })
//       );
//     }
//   });
// };

// const getAllTemperaments = async () => {
//   return await Temperament.findAll();
// };

// module.exports = {
//   chargeTemperamentsToDB,
//   getAllTemperaments,
// };