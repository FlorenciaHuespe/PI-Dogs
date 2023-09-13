const createDog = require("../controllers/createController");
// const { validateDogCreationFields } = require("../utils/validations");


const postDog = async (req, res) => {
  const {
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
  } = req.body;
  
  
  // validateDogCreationFields(req.body);
  try {
      const response = await createDog (name, image, minHeight, maxHeight, minWeight, maxWeight, minLifeSpan, maxLifeSpan, breed_group, temperaments);

     res.status(200).json(response);
  } catch (error) {
    res.status(404).send(error.message)
  }
};


module.exports = postDog;
