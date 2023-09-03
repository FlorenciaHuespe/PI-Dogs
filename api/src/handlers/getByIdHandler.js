const getDogsByID = require('../controllers/getByIdController');


const getDogsById = async (req, res) => {
      const {id} = req.params;

      const source = isNaN(id) ? "bdd" : "api"; // si es NaN es de la BD, si no es de la API

      try {
  const dog = await getDogsByID(id, source);
  if (!dog) {
    // Si dog es null, significa que no se encontró el ID en ninguna fuente.
    res.status(404).json({ error: "No se encontró el ID mencionado." });
  } else {
    res.status(200).json(dog);
  }
} catch (error) {
  res.status(400).json({ error: error.message });
}
};

module.exports = getDogsById;