const { Router } = require("express");
const getDogs = require("../handlers/getAllHandler");
const postDog = require('../handlers/createHandler');
const getDogsById = require ('../handlers/getByIdHandler');
const deleteDog = require ('../handlers/deleteHandler');

const routerDog = Router();


routerDog.get("/:id", getDogsById); //busca x id
routerDog.get("/", getDogs);//todas las razas x name
routerDog.post("/", postDog); //crea
routerDog.delete("/:id", deleteDog); // elimina
// routerDog.put("/", getBreedsFilteredByTemp); //modifica


module.exports = routerDog;