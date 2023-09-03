const { getAllDogs, getDogByName } = require("../controllers/getAllController");

const getDogs = async (req, res) => {
  try {
    const name = req.query.name;
    if (name) {
      const dogsName = await getDogByName(name);
      res.status(200).json(dogsName);
    } else {
      const allDogs = await getAllDogs();
      res.status(200).json(allDogs);
    }
  } catch (error) {
    let status;
    if (error.message === "La raza solicitada no se encuentra") {
      status = 404;
    } else {
      status = 500;
    }
    res.status(status).json({ error: error.message });
  }
};


module.exports = getDogs;
