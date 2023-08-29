const { createDog } = require("../controllers/controller_dogs");
const { validateDogCreationFields } = require("../utils/validations");




//buscar todas las razas y x name
const getDogs = (req, res)=>{
    const {name} = req.query;
    if(name){
        res.send(`Quiero buscar todos los que se llamen ${name}`);
    } else {
        res.send("Quiero enviar todas las razas");
    }
};

// const getDogs = async (req, res) => {
//   try {
//     const name = req.query.name;
//     if (name) {
//       const dogsName = await controllerDogs.getDogsByName(name);
//       res.status(200).json(dogsName);
//     } else {
//       const allDogs = await controllerDogs.getAllDogs();
//       res.status(200).json(allDogs);
//     }
//   } catch (error) {
//       let status;
//       if (error.message.startsWith("There")) {
//         status=404;
//         res.status(status).json({ error: error.message });
//       }else{
//         status = 500
//         res.status(status).json({ error: error.message });
//       }
//     // res.status(500).json({ error: error.message });
//   }
// };

//busca  x id
const getDogsById = (req,res)=>{
    const id = req.params.id;
    res.send(`Detalle de la raza ${id}`)
};

// const getDogsById = async (req, res) => {
//   try {
//     const id = req.params.id;
//     if (id) {
//       const dog = await controllerDogs.getDogsByID(id);
//       if (!dog.length)
//         return res.status(404).json({ error: `ID dog not found, ID = ${id}` });
//       return res.status(200).json(dog);
//     } else {
//       return res.status(400).json({ error: "missing id" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

//crea un perro

const postDog = async (req, res) => {
  try {
    const {
      name,
      image,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight,
      minLifeSpan,
      maxLifeSpan,
      temperaments,
      breed_group
    } = req.body;

    validateDogCreationFields(req.body);

    try {
      let newDog = await createDog(
        name,
        image,
        minHeight,
        maxHeight,
        minWeight,
        maxWeight,
        minLifeSpan,
        maxLifeSpan,
        temperaments,
        breed_group
      );
       
      res.status(201).json(newDog);
    } catch (error) {  // Capturar el error x si el perro existe
      if (error.message.startsWith("The")) {
        res.status(400).json({ error: error.message }); // Devolver un error de cliente (Bad Request) con un mensaje específico
      } else {
        throw error; // Relanzar cualquier otra excepción no esperada
      }
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//modifica
const getBreedsFilteredByTemp =  (req,res)=>{
    res.status(200).send("Voy a modificar un perro")
};

// const getBreedsFilteredByTemp = async(req,res)=>{
//   try {
//     const {temperament} = req.query
//     const dogs = await controllerDogs.breedsFilteredByTemp(temperament);
//     res.status(200).json(dogs);
    
//   } catch (error) {
//     res.status(500).json({ error: error.message });

    
//   }

// }
module.exports = {
  getDogs,
  getDogsById,
  postDog,
  getBreedsFilteredByTemp
};