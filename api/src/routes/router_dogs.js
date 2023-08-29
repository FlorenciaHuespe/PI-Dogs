const { Router } = require("express");
const { getDogs, getDogsById, postDog, getBreedsFilteredByTemp } = require("../handlers/handlersDogs");

const routerDog = Router();


routerDog.get("/", getDogs);//todas las razas
routerDog.get("/:id", getDogsById); //busca x id
routerDog.post("/", postDog); //crea
routerDog.put("/", getBreedsFilteredByTemp); //modifica


module.exports = routerDog;