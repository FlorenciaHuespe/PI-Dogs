// function validateDogCreationFields({
//   name,
//   image,
//   minHeight,
//   maxHeight,
//   minWeight,
//   maxWeight,
//   minLifeSpan,
//   maxLifeSpan,
//   temperaments,
// }) {
//   if (
//     !minHeight ||
//     !maxHeight ||
//     !minWeight ||
//     !maxWeight ||
//     !minLifeSpan ||
//     !maxLifeSpan ||
//     !name ||
//     !image
//   ) {
//     throw new Error("Debe completar toda la información requerida");
//   } else if (
//     minHeight <= 0 ||
//     maxHeight <= 0 ||
//     minWeight <= 0 ||
//     maxWeight <= 0 ||
//     minLifeSpan <= 0 ||
//     maxLifeSpan <= 0
//     ) {
//       throw new Error("La altura, el peso o el valor de la vida útil no pueden ser negativos");
//     } else if (minHeight >= maxHeight) {
//       throw new Error(
//         "La altura mínima es mayor o igual a la altura máxima, valide los datos"
//       );
//     } else if (minWeight >= maxWeight) {
//       throw new Error(
//         "El peso mínimo es mayor o igual al peso máximo, valide los datos"
//       );
//     } else if (minLifeSpan >= maxLifeSpan) {
//       throw new Error(
//         "La vida útil mínima es mayor o igual al peso máximo, valide los datos"
//       );
//     }
//   }


// module.exports = {
//   validateDogCreationFields,
// };
