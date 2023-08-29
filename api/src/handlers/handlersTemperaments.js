// const { controllerTemperaments } = require("../controllers");


const getTemperaments = (req, res)=>{
    res.status(200).send("Todos los temperamentos")
}

// let getTemperaments = async (req, res) => {
//   try {
//     let temperaments = await controllerTemperaments.getAllTemperaments();
//     res.status(200).json(temperaments);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

module.exports = {
  getTemperaments,
};