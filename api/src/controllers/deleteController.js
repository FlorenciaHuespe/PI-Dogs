// const {Dog} = require ('../db');

// const deleteDOG = async (id) =>{
//     const dogFind = await Dog.destroy({where:{id}})
//  if(!dogFind) return {error: `No se encontro el ${id}!`}
//  else{
//     return dogFind
//  }
// };

// module.exports = deleteDOG;

const { Dog } = require('../db');

const deleteDOG = async (id) => {
    const dogDeleted = await Dog.destroy({ where: { id } });

    if (dogDeleted === 0) {
        throw new Error(`No se encontró el perro con ID ${id}!`);
    }

    return { message: `Se eliminó el perro con ID ${id}` };
};

module.exports = deleteDOG;

