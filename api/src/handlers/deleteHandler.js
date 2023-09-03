// const deleteDOG = require ('../controllers/deleteController');

// const deleteDog = async (req, res) =>{
//     const {id} = req.params;

//     if (id) {
//         const dogDeleted = await deleteDOG(id);

//         if(!dogDeleted) return res.status(404).json(dogDeleted);
//      else {
//         return res.status(200).json(dogDeleted)
//     }
//     }else{
//         return  res.status(500).send(error.message)
//     }
// }

// module.exports = deleteDog;
const deleteDOG = require('../controllers/deleteController');

const deleteDog = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await deleteDOG(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

module.exports = deleteDog;

